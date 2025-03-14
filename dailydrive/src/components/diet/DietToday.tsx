import '../styles/dietToday.css';

import { DailyDiet, Meal } from "../../types";
import DietMeal from "./DietMeal";
import DietSummary from "./DIetSumary";
import { useEffect, useState } from 'react';
import { fetchDietByDate } from '../../services/DietService';
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
                    <MealForm initialData={formData} handleModalClose={() => setModalOpen(false)} onFormSubmit={refetchData} />
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

