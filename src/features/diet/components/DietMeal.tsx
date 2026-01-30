import { Meal } from "../../../types";
import MealProductList from "./MealProductList";

interface DietMealProps {
    mealData: Meal
    onMealChange: (meal?: Meal) => void; 
}

export default function DietMeal({ mealData, onMealChange }: DietMealProps) {

    const { name, products, totalCalories, totalProtein, totalCarbs, totalFat } = mealData;

    return (
        <div className="diet-meal" onClick={() => onMealChange(mealData)}>
            <div className="meal-header">
                <div className="meal-title">{name}</div>
                <div className="meal-macros">
                    <div className="meal-macros-item">
                        B: {totalProtein}
                    </div>
                    <div className="meal-macros-item">
                        W: {totalCarbs}
                    </div>
                    <div className="meal-macros-item">
                        T: {totalFat}
                    </div>
                    <div className="meal-macros-item">
                        Kcal: {totalCalories}
                    </div>
                </div>
            </div>
            <MealProductList productsData={products} />
        </div>
    )
}

