import { MdEdit, MdDelete } from "react-icons/md";

import type { WorkoutTemplate } from "../../types";
interface WorkoutsGalleryItemProps {
    workoutData: WorkoutTemplate
    onEdit: (template: WorkoutTemplate) => void; 
    onDelete: (id: number) => void; 
}

export default function WorkoutsGalleryItem({ workoutData, onEdit, onDelete }: WorkoutsGalleryItemProps) {

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
                {workoutData.weightExercises.map((ex, index) => (
                    <li 
                        className="gallery-item--exercise-item"
                        key={ex + index}
                    >
                        {ex}
                    </li>
                )).slice(0, 3)}
            </ul>
            <button className="gallery-item--button-start">
                Start workout
            </button>
        </div>
    )
} 