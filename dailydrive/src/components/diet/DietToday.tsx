import '../styles/dietToday.css';

import { DailyDiet, Meal } from "../../types";
import DietMeal from "./DietMeal";
import DietSummary from "./DIetSumary";
import { useEffect, useState } from 'react';
import { addMeal, deleteMeal, fetchDietByDate, updateMeal } from '../../services/DietService';
import Modal from '../primitives/Modal';
import MealForm from './MealForm';

interface DietTodayProps {
    date: Date; 
}

export default function DietToday({ date }: DietTodayProps) {

    const [dietData, setDietData] = useState<DailyDiet | null>(null);
    const [modalOpen, setModalOpen] = useState(false); 
    const [formData, setFormData] = useState<Meal | undefined>(undefined);

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await fetchDietByDate(date);
            if(error) {
                setDietData(null); 
            } else {
                setDietData(data); 
            }
        }
        fetchData(); 
    }, [date]);

    const handleMealChange = (meal?: Meal) => {
        setFormData(meal);
        setModalOpen(true); 
    }

    const refetchData = async () => {
        const { data, error } = await fetchDietByDate(date);
        if(error) {
            setDietData(null); 
        } else {
            setDietData(data);
        }
    }
    
    const handleMealDelete = async (id: number) => {
        const { error } = await deleteMeal(id);
        if(error) {
            console.error(error.message);
        }
        setModalOpen(false); 
        refetchData();
    }

    const handleFormSubmit = async (meal: Meal) => {
        if(meal.id) {
            const { error } = await updateMeal(meal);   
            if(error) {
                console.error(error.message);
            }          
        } else {
            const { error } = await addMeal({
                ...meal, 
                date
            });
            if(error) {
                console.error(error.message);
            }
        }
        refetchData();
    }

    const { meals, totalCalories, totalCarbs, totalFat, totalProtein } = dietData || { meals: [], totalCalories: 0, totalCarbs: 0, totalFat: 0, totalProtein: 0 };

    return (
        <div className="diet-today diet-today--container">
            {
                modalOpen 
                &&
                <Modal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                >
                    <MealForm initialData={formData} dietId={dietData?.id || 0} handleModalClose={() => setModalOpen(false)} onFormSubmit={handleFormSubmit} onDelete={handleMealDelete} />
                </Modal>
            }

            <DietSummary data={{ totalCalories, totalProtein, totalCarbs, totalFat }} />

            {
                meals.map((meal, index) => (
                    <DietMeal key={meal.id ? meal.id : index} mealData={meal} onMealChange={handleMealChange} />
                ))
            }

            <button className="btn btn-add--meal" onClick={() => handleMealChange()}>Dodaj posiłek +</button>

        </div>
    )
}

