import "../styles/workoutsList.css";
import { WorkoutSession } from "../../types"
import { MdDelete } from "react-icons/md";

interface WorkoutsListItemProps {
    workoutsData: WorkoutSession
    onDelete: () => void
}

export const formatDate = (date: string) => date.split('T')[0].split('-').reverse().join('. ')

export default function WorkoutsListItem({ onDelete, workoutsData }: WorkoutsListItemProps) {
    const { name, startTime, endTime, weightExercises, cardioExercises } = workoutsData;
    const startDate = formatDate(startTime as string);

    return (
        <div className="card">
            <div className="card-header">
                <div className="card-subheader">
                    <div className="card-header-date">{startDate}</div>
                    <div className="card-header-buttons">
                        <button className="btn-remove btn-remove--card" onClick={onDelete}><MdDelete/></button>
                    </div>
                </div>
                <div className="card-header-title">
                    {name}
                </div>
            </div>
            <div className="card-body">
                <ul className="exercise-list">
                    {weightExercises?.map((ex, index) => (
                        <li 
                            className="exercise-item"
                            key={(ex.id as number) + index}    
                        >   
                            <div className="exercise-name">{ex.name}</div>
                            <ul className="sets">
                                {ex.sets.map(set => (
                                    <li 
                                        className="set"
                                        key={Math.random()}
                                    >
                                        {set.reps} x {set.weight} kg
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                    {cardioExercises?.map((ex, index) => (
                        <li 
                            className="exercise-item"
                            key={(ex.id as number) + index}    
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