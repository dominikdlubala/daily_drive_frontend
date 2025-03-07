import "../styles/workoutsList.css";
import { WorkoutSession } from "../../types"

interface WorkoutsListItemProps {
    workoutsData: WorkoutSession
}

export default function WorkoutsListItem({ workoutsData }: WorkoutsListItemProps) {

    return (
        <div className="card">
            <div className="card-header">
                {workoutsData.name}
            </div>
            <div className="card-body">
                <ul className="exercise-list">
                    {workoutsData.weightExercises?.map(ex => (
                        <li 
                            className="exercise-item"
                            key={ex.id}    
                        >   
                            <div className="exercise-name">{ex.name}</div>
                            <ul className="sets">
                                {ex.sets.map(set => (
                                    <li 
                                        className="set"
                                        key={set.setNumber}
                                    >
                                        {set.reps} x {set.weight} kg
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                    {workoutsData.cardioExercises?.map(ex => (
                        <li 
                            className="exercise-item"
                            key={ex.id}    
                        >   
                            <div className="exercise-name">{ex.name}</div>
                            <div className="cardio-details">
                                Intensywność: {ex.intensity} Czas: {ex.duration} min
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}