import { useEffect, useState } from "react"
import WorkoutsGalleryItem from "./WorkoutsGalleryItem"
import { addWorkoutTemplate, deleteWorkoutTemplate, fetchWorkoutTemplates, updateWorkoutTemplate } from "../../../services/WorkoutTemplateService";
import { WorkoutTemplate } from "../../../types";
import { useAuth } from "../../../hooks/useAuth";
import { useAppDispatch } from "src/hooks/useAppDispatch";
import { openModal } from "src/store";
import { Link } from "react-router-dom";
import { useGetUserWorkoutTemplatesQuery } from "src/api/queries/workoutApi";
import Skeleton from "src/components/skeletons/Skeleton";

interface WorkoutTemplatesGalleryProps {
    workoutTemplates?: WorkoutTemplate[]; 
    isLoading?: boolean; 
}

export default function WorkoutTemplatesGallery({ workoutTemplates, isLoading }: WorkoutTemplatesGalleryProps) {

    // useEffect(() => {
    //     const fetchTemplates = async () => {
    //         const { data, error } = await fetchWorkoutTemplates(token as string); 
    //         if(error) {
    //             console.error(error); 
    //         } else if(data) {
    //             setTemplates(data as WorkoutTemplate[]); 
    //         }
    //     }

    //     fetchTemplates(); 
    // }, [token]); 

    // const handleFormSubmit = async (formValues: WorkoutTemplateFormValues, add?: boolean) => {
    //     if(add) {
    //         const {data, error } = await addWorkoutTemplate(token as string, {
    //             name: formValues.name, 
    //             exercises: formValues.exercises
    //         } as Omit<WorkoutTemplate, 'id'>)
    //         if(error) {
    //         } else if (data) {
    //         }
    //     } else {
    //         const { data, error } = await updateWorkoutTemplate(token as string, {
    //             id:  formValues.id,
    //             name: formValues.name, 
    //             exercises: formValues.exercises
    //         } as WorkoutTemplate); 
    //         if(error) {
    //         } else if (data) {
    //             setTemplateToUpdate(undefined); 
    //         }
            
    //     } 

    //     handleModalClose(true); 
    // }


    let content = (
        <>
            {Array.from({ length: 12 }).map((el, idx) => (
                <Skeleton key={idx} className="skeleton_workout-template--item" />
            ))}
        </>
    )
    

    if(!isLoading) {
        content = (
            <>
                {workoutTemplates?.map((el, index) => (
                    <WorkoutsGalleryItem key={el.id + index} workoutData={el}/>
                ))}
            </>
        )
    }

    return (
        <div className="templates_list">
            {content}
        </div>
    )
}