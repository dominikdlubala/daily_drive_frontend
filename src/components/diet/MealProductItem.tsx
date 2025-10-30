import { Product } from "../../types";
import { round } from "./MealForm";

interface MealProductItemProps {
    productData: Product; 
}

export default function MealProductItem({ productData }: MealProductItemProps) {

    const { name, weight, caloriesPer100g } = productData;

    return (
        <div className="meal-product-item">
            <div className="product-title">{name} ({weight}g)</div>
            <div className="product-macros">
                <div className="product-macros-item">
                </div>
                <div className="product-macros-item">
                    {round(caloriesPer100g * (weight * 0.01), 1)}kcal
                </div>
            </div>
        </div>
    )
}