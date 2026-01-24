import '@/features/workouts/styles/workoutTemplate.scss';
import { Link } from 'react-router-dom';

import { useGetUserWorkoutTemplatesQuery } from "src/api/queries/workoutApi";
import WorkoutTemplatesGallery from "src/features/workouts/components/WorkoutsGallery";

export default function WorkoutTemplatesPage() {

  const { data: response, isLoading } = useGetUserWorkoutTemplatesQuery(); 

  return (
    <div className="page page_workout-templates">
      <div className="page_header">
        <div className="page_title">Szablony treningowe</div>
        <Link
            className="workout-templ--add"
            to={('/workouts/templates/create')}    
        >Dodaj szablon +</Link>
      </div>
      <div className="page_section">
        <WorkoutTemplatesGallery workoutTemplates={response?.data} isLoading={isLoading} />
      </div>
    </div>
  )
}