<<<<<<< HEAD
import { round } from "../diet/MealForm";
=======
import { round } from "src/features/diet/components/MealForm";
>>>>>>> feat/rtkquery_implementation

interface ProgressBarProps {
    currentAmount: number; 
    dailyGoal: number; 
    unitOfMeasure?: string; 
    additional?: number; 
}

export default function ProgressBar({ currentAmount, dailyGoal, unitOfMeasure, additional }: ProgressBarProps) {

    const additionalAmount = additional ? ( additional > 0 ? additional : 0): 0; 
    const progress = Math.min((currentAmount / (dailyGoal+additionalAmount)) * 100, 100); 

    return (
        <div className="progress-bar--container">
            <div className="progress-bar" style={{ width: `${progress}%` }} />
            <span className="progress-bar--text">
                {`${round(currentAmount, 1)} / ${dailyGoal} ${additional !== null ? `(+${additionalAmount})` : ''} ${unitOfMeasure}`}
            </span>
        </div>
    )
}