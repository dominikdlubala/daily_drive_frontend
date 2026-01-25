import { MdEdit, MdDelete } from "react-icons/md";
import { HiDotsHorizontal } from "react-icons/hi";

import type { CurrentWorkout, ExerciseSet, WorkoutTemplate } from "../../../types";
import { useAuth } from "../../../hooks/useAuth";
import { startCurrentWorkout } from "../../../services/WorkoutCurrentService";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useConfirm } from "@/hooks/useConfirm";
import { useDeleteWorkoutTempalteMutation } from "@/api/queries/workoutApi";
interface WorkoutsGalleryItemProps {
    workoutTemplate: WorkoutTemplate
}

export default function WorkoutsGalleryItem({ workoutTemplate }: WorkoutsGalleryItemProps) {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false); 
    const [isListExtended, setIsListExtended] = useState(false); 
    const drawerRef = useRef<HTMLDivElement>(null); 
    const drawerBtnRef = useRef<HTMLButtonElement>(null); 
    const { confirm }  = useConfirm(); 
    const [deleteWorkoutTemplate, { isLoading, isSuccess }] = useDeleteWorkoutTempalteMutation(); 
    
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if(drawerBtnRef.current && drawerBtnRef.current.contains(e.target as Node)){
                return; 
            }
            if(drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
                setIsDrawerOpen(false); 
            }
        } 
        isDrawerOpen && document.addEventListener('mousedown', handleClickOutside); 
        return () => document.removeEventListener('mousedown', handleClickOutside); 
    }, [isDrawerOpen]); 


    const trainedMuscles = workoutTemplate.exercises.reduce(
        (acc, exercise) => {
            exercise.bodyParts?.forEach(bp => {
                acc[bp.name] = (acc[bp.name] || 0) + 1; 
            });
            return acc;
        }, {} as Record<string, number>
    )
    
    const orderedTrainedMuscles = Object.entries(trainedMuscles)
        .sort(([, countA], [, countB]) => countB - countA)
        .slice(0,2)
        .map(([name, count]) => ({ name, count})); 
        
    const handleTemplateDelete = async (id: number) => {
        const isConfirmed = await confirm(`Czy chcesz usunąć szablon ${workoutTemplate.name}?`)
        if(isConfirmed){
            await deleteWorkoutTemplate(id);
        }
    }

    return (
        <div className="templates_card">
            <div className="templates_card-header">
                <h3 
                    className="templates_card-title"
                >
                    {workoutTemplate.name}
                </h3>
                <div className="templates_card-buttons">
                    <button 
                        className="templates_card-button"
                        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                        ref={drawerBtnRef}
                    >
                        <HiDotsHorizontal />
                    </button>
                    {
                        isDrawerOpen 
                        &&
                        <div 
                            className="drawer templates_card-drawer"
                            ref={drawerRef}
                        >
                            <button
                                className="drawer_item"
                            >
                                Rozpocznij trening
                            </button>
                            <Link
                                to={`/workouts/templates/edit/${workoutTemplate.id}`}
                                className="drawer_item"
                            >
                                Edytuj
                            </Link>
                            <button
                                className="drawer_item"
                                onClick={() => handleTemplateDelete(workoutTemplate.id)}
                            >
                                Usuń
                            </button>
                        </div>
                    }
                </div>
            </div>
            <div className="templates_card-muscles">
                {orderedTrainedMuscles.map(muscle => (
                    <span 
                        key={muscle.name}
                        className="templates_card-muscles--item"
                    >
                        {muscle.name}
                    </span>
                ))}
            </div>
            <div className="templates_card-exercise-list--wrapper">
                <ul 
                    className="templates_card-exercise-list"
                >
                    {workoutTemplate.exercises.map((ex, idx) => (
                        <li 
                            className="templates_card-exercise-list--item"
                            key={ex.id + idx}
                        >
                            {idx+1}. {ex.name}
                        </li>
                    )).slice(0, 3)}
                    {
                        isListExtended
                        &&
                        workoutTemplate.exercises.map((ex, idx) => (
                            <li 
                                className="templates_card-exercise-list--item templates_card-exercise-list--item-extended"
                                key={ex.id + idx}
                            >
                                {idx+1}. {ex.name}
                            </li>
                        )).slice(3,)
                    }
                </ul>
                {
                    workoutTemplate.exercises.length > 3
                    &&
                    <div className="templates_card-exercise-list--extend">
                        {
                            isListExtended
                            ||
                            <span>
                                [Zawiera jeszcze {workoutTemplate.exercises.length-3} ćwiczenia]
                            </span>
                    }
                        {
                            !isListExtended
                            ?
                            <FaChevronDown
                                className="templates_card-exercise-list--extend-btn"
                                onClick={() => setIsListExtended(true)}
                            />
                            :
                            <FaChevronUp
                                className="templates_card-exercise-list--extend-btn"
                                onClick={() => setIsListExtended(false)}
                            />
                        }
                    </div>
                }
                <div className="templates_card-exercise-list--border"></div>
            </div>
        </div>
    )
} 