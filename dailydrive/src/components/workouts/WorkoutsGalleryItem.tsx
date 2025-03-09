import { MdEdit, MdDelete } from "react-icons/md";

import type { CurrentWorkout, ExerciseSet, WorkoutTemplate } from "../../types";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { startCurrentWorkout } from "../../store";
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
                sets: [] as ExerciseSet[]
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

    const dispatch = useAppDispatch(); 

    const startWorkoutData: CurrentWorkout = templateToCurrent(workoutData);

    const handleClick = () => {
        dispatch(startCurrentWorkout(startWorkoutData));
    }

    return (
        <div className="gallery-item gallery-item--workouts">
            <div className="gallery-item--header">
                <MdEdit className="btn-edit" onClick={() => onEdit(workoutData)} />
                {workoutData.name}
                <MdDelete className="btn-delete" onClick={() => onDelete(workoutData.id)} />
            </div>
            <ul 
                className="gallery-item--exercises-list"
            >
                {workoutData.exercises.map((ex, index) => (
                    <li 
                        className="gallery-item--exercise-item"
                        key={ex.name + index}
                    >
                        {ex.name}
                    </li>
                )).slice(0, 3)}
            </ul>
            <button onClick={handleClick} className="gallery-item--button-start">
                Rozpocznij trening
            </button>
        </div>
    )
} 