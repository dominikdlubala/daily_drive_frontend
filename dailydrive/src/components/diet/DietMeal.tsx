import { useState } from "react";
import { Meal } from "../../types";
import MealProductList from "./MealProductList";
import Modal from "../primitives/Modal";
import MealForm from "./MealForm";

interface DietMealProps {
    mealData: Meal
}

export default function DietMeal({ mealData }: DietMealProps) {
    const [modalOpen, setModalOpen] = useState(false); 

    const onAddProduct = () => {
        setModalOpen(true); 
    }

    return (
        <div className="diet-meal">
            {
                modalOpen 
                &&
                <Modal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                >
                    <MealForm initialData={mealData} handleModalClose={() => setModalOpen(false)} />
                </Modal>
            }

            <div className="meal-header">
                <div className="meal-title">{mealData.name}</div>
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
            <MealProductList productsData={mealData.products} onAddProduct={onAddProduct} />
        </div>
    )
}

