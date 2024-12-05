import MealProductList from "./MealProductList";

interface DietMealProps {
    mealData: {
        title: string; 
        products: { name: string }[]
    }
}

export default function DietMeal({ mealData }: DietMealProps) {


    return (
        <div className="diet-meal">
            <div className="meal-header">
                <div className="meal-title">{mealData.title}</div>
                <div className="meal-macros">
                    <div className="meal-macros-item">
                        Calories
                    </div>
                    <div className="meal-macros-item">
                        Protein
                    </div>
                    <div className="meal-macros-item">
                        Carbs
                    </div>
                    <div className="meal-macros-item">
                        Fat
                    </div>
                </div>
            </div>
            <MealProductList productsData={mealData.products} />
        </div>
    )
}

