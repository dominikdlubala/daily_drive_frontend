import { useParams } from "react-router-dom";
import WorkoutTemplateForm from "src/features/workouts/components/WorkoutTemplateForm";

export default function WorkoutTemplatesFormPage() {

  const params = useParams(); 

  return (
    <div className="page page_workout-templates-form">
      <WorkoutTemplateForm />
    </div>
  )
}