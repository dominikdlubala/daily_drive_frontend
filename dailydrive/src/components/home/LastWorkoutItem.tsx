import { MdCalendarToday } from "react-icons/md";
import { BodyPart, WorkoutSession } from "../../types"

interface LastWorkoutItemProps {
    workoutData: WorkoutSession
}

const translateBodyPart = (bodyPart?: BodyPart) => { 
        switch(bodyPart) {
            case 'chest': return 'Klatka piersiowa';
            case 'back': return 'Plecy';
            case 'shoulders': return 'Barki';
            case 'legs': return 'Nogi';
            case 'arms': return 'Ramiona';
            default: return 'Inne';
        }
    }

export default function LastWorkoutItem({ workoutData }: LastWorkoutItemProps) {
    return (
        <div className="side-section-item">
            <div className="side-section-item--header">
                <div>
                    <MdCalendarToday />
                    {workoutData.startTime?.split('T')[0].split('-').reverse().join('.')}
                </div>
                {workoutData.name}
            </div>
            <div className="body-part"> {translateBodyPart(workoutData.bodyPart)} </div>
        </div>
    )
} 