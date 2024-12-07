import DietMeal from "./DietMeal";
import DietSummary from "./DIetSumary";

interface DietTodayProps {
    date: Date; 
}

export default function DietToday({ date }: DietTodayProps) {

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
