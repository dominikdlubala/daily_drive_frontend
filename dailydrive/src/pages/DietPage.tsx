import './styles/dietPage.css'; 
import DietToday from "../components/diet/DietToday";

export default function DietPage() {

    return (
        <div className="page page-diet">
            <DietToday />
        </div>
    )
}