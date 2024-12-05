interface MealProductItemProps {
    productData: { name: string } 
}

export default function MealProductItem({ productData }: MealProductItemProps) {

    return (
        <div className="meal-product-item">
            <div className="product-title">{productData.name}</div>
            <div className="product-macros">
                <div className="product-macros-item">
                    Calories
                </div>
                <div className="product-macros-item">
                    Protein
                </div>
                <div className="product-macros-item">
                    Carbs
                </div>
                <div className="product-macros-item">
                    Fat
                </div>
            </div>
        </div>
    )
}