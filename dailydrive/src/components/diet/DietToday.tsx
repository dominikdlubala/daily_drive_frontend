import DietMeal from "./DietMeal";
import DietSummary from "./DIetSumary";

export default function DietToday() {

    return (
        <div className="diet-today diet-today--container">
            <DietSummary />

            <DietMeal mealData={mockData} />
        </div>
    )
}


const mockData = {
    title: 'Śniadanie', 
    products: [
        {
            name: 'product1'
        },
        {
            name: 'product1'
        },
        {
            name: 'product1'
        },
        {
            name: 'product1'
        }
    ]   
}
