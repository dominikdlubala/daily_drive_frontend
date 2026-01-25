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
                {workoutTemplates?.map((el) => (
                    <WorkoutsGalleryItem key={el.id} workoutTemplate={el}/>
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