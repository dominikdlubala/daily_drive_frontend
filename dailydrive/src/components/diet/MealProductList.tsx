import { Product } from "../../types";
import MealProductItem from "./MealProductItem";

interface MealProductListProps {
    productsData: Product[]
    onAddProduct: () => void; 
}

export default function MealProductList({ productsData, onAddProduct }: MealProductListProps) {

    const handleAddProduct = () => {
        onAddProduct();
    }

    return (
        <div className="meal-product-list">
            {
                productsData.map((product, index) => (
                    <MealProductItem productData={product} key={index} />
                ))
            }
            <button className="btn btn-add--product" onClick={handleAddProduct}>Dodaj produkty +</button>
        </div>
    )
}

