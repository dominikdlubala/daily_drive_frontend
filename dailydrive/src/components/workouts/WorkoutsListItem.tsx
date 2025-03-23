import { useState } from 'react';
import { WorkoutSession } from "../../types"
import { MdDelete } from "react-icons/md";

interface WorkoutsListItemProps {
    workoutsData: WorkoutSession
    onDelete: () => void
}

export const formatDate = (date: string) => date.split('T')[0].split('-').reverse().join('. ')

export default function WorkoutsListItem({ onDelete, workoutsData }: WorkoutsListItemProps) {
    const { name, startTime, weightExercises, cardioExercises } = workoutsData;
    const startDate = formatDate(startTime as string);
    const [showAllExercises, setShowAllExercises] = useState(false);

    const toggleShowExercises = () => {
        setShowAllExercises(!showAllExercises);
    }

    return (
        <div className="list-workout--item">
            <div className="list-workout--item-header">
                <div className="list-workout--item-header-date">{startDate}</div>
                <div className="list-workout--item-header-title">
                    {name}
                </div>
                <div className="list-workout--item-header-buttons">
                    <button className="btn-remove btn-remove--list-workout--item" onClick={onDelete}><MdDelete/></button>
                </div>
            </div>
            <div className="list-workout--item-body">
                <ul className="exercise-list">
                    {(showAllExercises ? weightExercises : weightExercises?.slice(0, 2))?.map((ex, index) => (
                        <li 
                            className={`exercise-item ${index === 1 && !showAllExercises ? 'exercise-item--faded' : ''}`}
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
                    {(showAllExercises ? cardioExercises : cardioExercises?.slice(0, 2))?.map((ex, index) => (
                        <li 
                            className={`exercise-item ${index === 1 && !showAllExercises ? 'exercise-item--faded' : ''}`}
                            key={(ex.id as number) + index}    
                        >   
                            <div className="exercise-name">{ex.name}</div>
                            <div className="cardio-details">
                                Intensywność: {ex.intensity} Czas: {ex.duration} min
                            </div>
                        </li>
                    ))}
                </ul>
                {
                    (( (weightExercises?.length && weightExercises?.length > 2) || (cardioExercises?.length && cardioExercises?.length > 2) )) 
                    ? 
                    (
                        <button className="btn-toggle-exercises" onClick={toggleShowExercises}>
                            {showAllExercises ? 'Zwiń' : 'Pokaż więcej'}
                        </button>
                    )
                    : 
                    ''
                }
                {/* <button className="btn-toggle-exercises" onClick={toggleShowExercises}>
                            {showAllExercises ? 'Zwiń' : 'Pokaż więcej'}
                </button> */}
            </div>
        </div>
    )
}