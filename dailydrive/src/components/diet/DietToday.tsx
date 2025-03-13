import '../styles/dietToday.css';

import { DailyDiet } from "../../types";
import DietMeal from "./DietMeal";
import DietSummary from "./DIetSumary";

interface DietTodayProps {
    data?: DailyDiet
}

export default function DietToday({ data }: DietTodayProps) {

    const { meals } = data || { meals: [] }

    return (
        <div className="diet-today diet-today--container">
            <DietSummary />

            {
                meals.map((meal, index) => (
                    <DietMeal key={meal.id ? meal.id : index} mealData={meal} />
                ))
            }

        </div>
    )
}
