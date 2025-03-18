import { UserGoal } from "../../types";
import ProgressBar from "../primitives/ProgressBar"

interface DietSummaryProps {
    data: {
        totalCalories: number;
        totalProtein: number;
        totalCarbs: number;
        totalFat: number;
    }, 
    dietGoal?: UserGoal;
    isHomePage?: boolean;
}

export default function DietSummary({ data, dietGoal, isHomePage }: DietSummaryProps) {

    const { totalCalories, totalProtein, totalCarbs, totalFat } = data;
    const { goalCalories, goalProtein, goalCarbs, goalFat } = dietGoal || { goalCalories: 2000, goalProtein: 200, goalCarbs: 200, goalFat: 200 };

    const classes = isHomePage ? 'diet-summary-home' : 'diet-summary';

    return (
        <div className={`${classes}`}>
            <div className="calories">
                Kalorie
                <ProgressBar currentAmount={totalCalories} dailyGoal={goalCalories} unitOfMeasure="kcal" />
            </div>   
            <div className="macros">
                <div className="macros-item macros-protein ">
                    Białko 
                    <ProgressBar currentAmount={totalProtein} dailyGoal={goalProtein} unitOfMeasure="g" />
                </div>
                <div className="macros-item macros-carbs">
                    Węglowodany 
                    <ProgressBar currentAmount={totalCarbs} dailyGoal={goalCarbs} unitOfMeasure="g" />
                </div>
                <div className="macros-item macros-fat">
                    Tłuszcz 
                    <ProgressBar currentAmount={totalFat} dailyGoal={goalFat} unitOfMeasure="g" />
                </div>
            </div>         
        </div>
    )
}