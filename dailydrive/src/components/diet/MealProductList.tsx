import MealProductItem from "./MealProductItem";

interface MealProductListProps {
    productsData: { name: string }[]
}

export default function MealProductList({ productsData }: MealProductListProps) {

    return (
        <div className="meal-product-list">
            {
                productsData.map(product => (
                    <MealProductItem productData={product} />
                ))
            }
        </div>
    )
}

