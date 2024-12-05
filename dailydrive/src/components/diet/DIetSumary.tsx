import ProgressBar from "../primitives/ProgressBar"

export default function DietSummary() {

    return (
        <div className="diet-summary">
            <div className="macros">
                <div className="macros-item macros-protein ">
                    Protein
                    <ProgressBar currentAmount={80} dailyGoal={200} unitOfMeasure="gram" />
                </div>
                <div className="macros-item macros-carbs">
                    Carbs
                    <ProgressBar currentAmount={80} dailyGoal={200} unitOfMeasure="gram" />
                </div>
                <div className="macros-item macros-fat">
                    Fat
                    <ProgressBar currentAmount={80} dailyGoal={200} unitOfMeasure="gram" />
                </div>
            </div>
            <div className="calories">
                Calories
                <ProgressBar currentAmount={1200} dailyGoal={2000} unitOfMeasure="kcal" />
            </div>            
        </div>
    )
}