import { MdEdit, MdDelete } from "react-icons/md";

import type { CurrentWorkout, ExerciseSet, WorkoutTemplate } from "../../../types";
import { useAuth } from "../../../hooks/useAuth";
import { startCurrentWorkout } from "../../../services/WorkoutCurrentService";
interface WorkoutsGalleryItemProps {
    workoutData: WorkoutTemplate
    onEdit?: (template: WorkoutTemplate) => void; 
    onDelete?: (id: number) => void; 
}

// const templateToCurrent = (template: WorkoutTemplate): CurrentWorkout => {
//     return {
//         workoutSession: {
//             name: template.name,
//             startTime: new Date().toISOString(),
//             exercises: template.exercises.filter(ex => ex.type === 'Cardio').map(ex => ({
//                 name: ex.name, 
//                 intensity: 0, 
//                 duration: 0
//             }))
//         }
//     }
// }

export default function WorkoutsGalleryItem({ workoutData, onEdit, onDelete }: WorkoutsGalleryItemProps) {

    const { token } = useAuth(); 

    // const startWorkoutData: CurrentWorkout = templateToCurrent(workoutData);

    const handleClick = async () => {
        // const { error } = await startCurrentWorkout(token as string, startWorkoutData);
        // if(error) {
        //     return
        // }
    }

    return (
        <div className="templates_card">
            <div className="templates_card-header">
                {workoutData.name}
                <div className="templates_card-buttons">
                    <MdEdit className="templates-card-buttons--edit"  />
                    <MdDelete className="templates-card-buttons--delete btn-danger"  />
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