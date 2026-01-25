import { useGetWorkoutTemplateByIdQuery } from "@/api/queries/workoutApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import WorkoutTemplateForm, { WorkoutTemplateFormSkeleton } from "src/features/workouts/components/WorkoutTemplateForm";
import { parse } from "zod";

export default function WorkoutTemplatesFormPage() {

  const params = useParams(); 
  const id = params.id ? Number.parseInt(params.id) : undefined; 
  const { data, isLoading, isFetching } = useGetWorkoutTemplateByIdQuery(id ?? skipToken); 
  
  const initialData = data?.data; 

  const shouldShowSkeleton = id && (isLoading || isFetching);  

  return (
    <div className="page page_workout-templates-form">
      {
        shouldShowSkeleton 
        ?
        <WorkoutTemplateFormSkeleton />
        :
        <WorkoutTemplateForm initialData={initialData} isLoading={shouldShowSkeleton as boolean}/>
      }
    </div>
  )
}