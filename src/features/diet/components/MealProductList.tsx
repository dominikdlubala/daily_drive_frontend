import { Product } from "../../../types";
import MealProductItem from "./MealProductItem";

interface MealProductListProps {
    productsData: Product[]
}

export default function MealProductList({ productsData }: MealProductListProps) {


    return (
        <div className="meal-product-list">
            {
                productsData.map((product, index) => (
                    <MealProductItem productData={product} key={index} />
                ))
            }
        </div>
    )
}

