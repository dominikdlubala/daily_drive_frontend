import { MdEdit, MdDelete } from "react-icons/md";

import type { CurrentWorkout, ExerciseSet, WorkoutTemplate } from "../../types";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { startCurrentWorkout } from "../../store";
import { useAuth } from "../../hooks/useAuth";
interface WorkoutsGalleryItemProps {
    workoutData: WorkoutTemplate
    onEdit: (template: WorkoutTemplate) => void; 
    onDelete: (id: number) => void; 
}

const templateToCurrent = (template: WorkoutTemplate): CurrentWorkout => {
    return {
        workoutSession: {
            name: template.name,
            startTime: new Date().toISOString(),
            weightExercises: template.exercises.filter(ex => ex.type === 'weight').map(ex => ({
                name: ex.name, 
                type: ex.type,
                sets: [] as ExerciseSet[],
                bodyPart: ex.bodyPart
            })),
            cardioExercises: template.exercises.filter(ex => ex.type === 'cardio').map(ex => ({
                name: ex.name, 
                type: ex.type,
                intensity: 0, 
                duration: 0
            }))
        }
    }
}

export default function WorkoutsGalleryItem({ workoutData, onEdit, onDelete }: WorkoutsGalleryItemProps) {

    const { token } = useAuth(); 

    const dispatch = useAppDispatch(); 

    const startWorkoutData: CurrentWorkout = templateToCurrent(workoutData);

    const handleClick = () => {
        dispatch(startCurrentWorkout({token, workout: startWorkoutData}));
    }

    return (
        <div className="gallery-item gallery-item--workouts">
            <div className="gallery-item--header">
                {workoutData.name}
                <div className="header-buttons">
                    <MdEdit className="btn-edit--gallery" onClick={() => onEdit(workoutData)} />
                    <MdDelete className="btn-delete--gallery" onClick={() => onDelete(workoutData.id)} />
                </div>
            </div>
            <ul 
                className="gallery-item--exercises-list"
            >
                {workoutData.exercises.map((ex, index) => (
                    <li 
                        className="gallery-item--exercise-item"
                        key={ex.name + index}
                    >
                        - {ex.name}
                    </li>
                )).slice(0, 3)}
            </ul>
            <button onClick={handleClick} className="gallery-item--button-start">
                Rozpocznij trening
            </button>
        </div>
    )
} 