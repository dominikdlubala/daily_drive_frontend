interface ProgressBarProps {
    currentAmount: number; 
    dailyGoal: number; 
    unitOfMeasure?: string; 
}

export default function ProgressBar({ currentAmount, dailyGoal, unitOfMeasure }: ProgressBarProps) {

    const progress = Math.min((currentAmount / dailyGoal) * 100, 100); 

    return (
        <div className="progress-bar--container">
            <div className="progress-bar" style={{ width: `${progress}%` }} />
            <span className="progress-bar--text">
                {`${currentAmount} / ${dailyGoal} ${unitOfMeasure}`}
            </span>
        </div>
    )
}