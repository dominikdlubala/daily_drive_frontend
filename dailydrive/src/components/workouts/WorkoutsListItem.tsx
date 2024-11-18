interface WorkoutsListItemProps {
    workoutsData: {
        title: string 
        time: string 
        exercises: string[]
    }
}

export default function WorkoutsListItem({ workoutsData }: WorkoutsListItemProps) {

    return (
        <div className="list-item list-item--workouts">
            <div className="list-item--workouts-title">
                {workoutsData.title}
            </div>
            <ul className="list-item--exercise-list">
                {workoutsData.exercises.map(ex => (
                    <li 
                        className="list-item--exercise-item"
                        key={ex}    
                    >
                        {ex}
                    </li>
                ))}
            </ul>
        </div>
    )
}