import ProgressBar from "../primitives/ProgressBar"

interface DietSummaryProps {
    data: {
        totalCalories: number;
        totalProtein: number;
        totalCarbs: number;
        totalFat: number;
    }
}

export default function DietSummary({ data }: DietSummaryProps) {

    const { totalCalories, totalProtein, totalCarbs, totalFat } = data;

    return (
        <div className="diet-summary">
            <div className="calories">
                Kalorie
                <ProgressBar currentAmount={totalCalories} dailyGoal={2000} unitOfMeasure="kcal" />
            </div>   
            <div className="macros">
                <div className="macros-item macros-protein ">
                    Białko 
                    <ProgressBar currentAmount={totalProtein} dailyGoal={200} unitOfMeasure="g" />
                </div>
                <div className="macros-item macros-carbs">
                    Węglowodany 
                    <ProgressBar currentAmount={totalCarbs} dailyGoal={200} unitOfMeasure="g" />
                </div>
                <div className="macros-item macros-fat">
                    Tłuszcz 
                    <ProgressBar currentAmount={totalFat} dailyGoal={200} unitOfMeasure="g" />
                </div>
            </div>         
        </div>
    )
}