import '../styles/dietToday.css';

import { DailyDiet, Meal, UserGoal } from "../../types";
import DietMeal from "./DietMeal";
import DietSummary from "./DIetSumary";
import { useEffect, useState } from 'react';
import { addMeal, deleteMeal, fetchDietByDate, updateMeal } from '../../services/DietService';
import Modal from '../primitives/Modal';
import MealForm from './MealForm';
import { useAuth } from '../../hooks/useAuth';
import { usePrompt } from '../../hooks/usePrompt';

interface DietTodayProps {
    date: Date;
    dietGoal: UserGoal;
}

export default function DietToday({ date, dietGoal }: DietTodayProps) {

    const { token } = useAuth();
    const { success, fault } = usePrompt(); 
    
    const [dietData, setDietData] = useState<DailyDiet | null>(null);
    const [modalOpen, setModalOpen] = useState(false); 
    const [formData, setFormData] = useState<Meal | undefined>(undefined);

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await fetchDietByDate(token, date);
            if(error) {
                setDietData(null); 
            } else {
                setDietData(data); 
            }
        }
        fetchData(); 
    }, [date, token]);

    const handleMealChange = (meal?: Meal) => {
        setFormData(meal);
        setModalOpen(true); 
    }

    const refetchData = async () => {
        const { data, error } = await fetchDietByDate(token, date);
        if(error) {
            setDietData(null); 
        } else {
            setDietData(data);
        }
    }
    
    const handleMealDelete = async (id: number) => {
        const { error } = await deleteMeal(token, id);
        if(error) {
            fault('Nie udało się usunąć posiłku!'); 
            return;
        }
        success('Pomyślnie usunięto posiłek!');
        setModalOpen(false); 
        refetchData();
    }

    const handleFormSubmit = async (meal: Meal) => {
        if(meal.id) {
            const { data } = await updateMeal(token, meal);    
            if(data) {
                success('Pomyślnie zaktualizowano posiłek!');
            }         
        } else {
            const { data } = await addMeal(token, {
                ...meal, 
                date
            });
            if(data) {
                success('Pomyślnie dodano posiłek!');
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

            <DietSummary data={{ totalCalories, totalProtein, totalCarbs, totalFat }} dietGoal={dietGoal} />

            {
                meals.map((meal, index) => (
                    <DietMeal key={meal.id ? meal.id : index} mealData={meal} onMealChange={handleMealChange} />
                ))
            }

            <button className="btn-add" onClick={() => handleMealChange()}>Dodaj posiłek +</button>

        </div>
    )
}

