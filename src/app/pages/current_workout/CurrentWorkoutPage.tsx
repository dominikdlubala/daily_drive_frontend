import WorkoutForm from "../../../features/workouts/components/WorkoutForm";
import './current_workout.scss';

export default function CurrentWorkoutPage() {

  return (
    <div className="page page-current-workout">
      <WorkoutForm />
    </div>
  )
}