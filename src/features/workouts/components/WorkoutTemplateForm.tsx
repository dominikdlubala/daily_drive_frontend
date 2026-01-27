import '../styles/workoutForm.css';
import { FormEvent, useEffect, useState } from 'react'; 
import { FaTrashAlt } from "react-icons/fa";
import * as z from 'zod'; 

import type { ExerciseDefinition, WorkoutTemplate } from '../../../types';
import { ExerciseSearch2 } from '../../exercise/components/ExerciseSearch';
import {  useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from 'src/components/primitives/inputs/Inputs';
import Modal from 'src/features/modal/components/Modal';
import { createPortal } from 'react-dom';
import { useCreateWorkoutTemplateMutation, useUpdateWorkoutTemplateMutation } from 'src/api/queries/workoutApi';
import { useNavigate } from 'react-router-dom';
import Skeleton from '@/components/skeletons/Skeleton';
import AddExerciseModal from '@/features/modal/components/exercise/AddExerciseModal';

export interface WorkoutTemplateFormProps {
    initialData?: WorkoutTemplate; 
    isLoading?: boolean; 
}

const workoutTemplateFormSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, { message: 'Szablon musi posiadać nazwę' }), 
    exercises: z.array(z.object({
        id: z.number(), 
        name: z.string(), 
        unit: z.string(),
        bodyParts: z.array(z.object({
            id: z.number().optional(), 
            name: z.string()
        })).optional() 
    })).min(1, { message: 'Szablon musi zawierać conajmniej jedno ćwiczenie' })
})

type WorkoutTemplateFormValues = z.infer<typeof workoutTemplateFormSchema>; 

export default function WorkoutTemplateForm({ initialData, isLoading: isInitialDataLoading }: WorkoutTemplateFormProps) {

    const [isSearchOpen, setIsSearchOpen] = useState(false); 
    const navigate = useNavigate(); 
    const [createWorkoutTemplate, { isLoading, isSuccess }] = useCreateWorkoutTemplateMutation(); 
    const [updateWorkoutTemplate, { isLoading: isUpdateLoading, isSuccess: isUpdateSuccess }] = useUpdateWorkoutTemplateMutation(); 

    const { 
        control, 
        handleSubmit, 
        formState: { errors, isSubmitting }, 
        trigger, 
    } = useForm<WorkoutTemplateFormValues>({
        resolver: zodResolver(workoutTemplateFormSchema), 
        defaultValues: {
            id: initialData?.id ?? undefined, 
            name: initialData?.name ?? '', 
            exercises: initialData?.exercises ?? []
        },
        mode: 'onBlur'
    })

    useEffect(() => {
        if(isSuccess || isUpdateSuccess) {
            navigate('/workouts/templates')
        }
    }, [isSuccess, isUpdateSuccess])

    const { fields, append, remove } = useFieldArray({
        control, 
        name: 'exercises'
    })

    const handleExerciseSelect = (exercise: ExerciseDefinition) => {
        append(exercise);
        setIsSearchOpen(false); 
        trigger('exercises'); 
    }

    const onSubmit = async (formValues: WorkoutTemplateFormValues) => {
        if(initialData && formValues.id) {
            await updateWorkoutTemplate({
                ...formValues, 
                id: formValues.id
            })
        } else {
            await createWorkoutTemplate(formValues); 
        }
    }

    let content = <WorkoutTemplateFormSkeleton />
    if(!isInitialDataLoading){
        content = (
            <form 
                className="form form_workout-template"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h3 className="form_title">Szablon treningu</h3>
                    <div className="form_group">
                        <label>Nazwa treningu</label>
                        <Input 
                            control={control}
                            name="name"
                        />
                    </div>
                    <div className="form_group">
                        <label>Ćwiczenia</label>
                        <ul className="form_list">
                            {
                                fields.map((ex, idx) => (
                                    <li className="form_list-item" key={ex.id}>
                                        <div>
                                            <span className="form_list-item--count">{idx+1}</span>
                                            <span className="form_list-item--content">{ex.name}</span>
                                        </div>
                                        <button 
                                            type="button"
                                            className="form_list-item--delete btn-delete"
                                            onClick={() => remove(ex.id)}
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </li>
                                ))
                            }
                        </ul>
                        <button 
                            type="button"
                            className="form_btn-secondary" 
                            onClick={() => setIsSearchOpen(true)}
                        >Dodaj ćwiczenie</button>
                        <AddExerciseModal
                            isOpen={isSearchOpen}
                            onClose={() => setIsSearchOpen(false)}
                            onExerciseSelect={handleExerciseSelect}
                        />
                        { errors.exercises && <span className="input-validate">{errors.exercises.message}</span> }
                    </div>
                <button 
                    type="submit"
                    className="btn-submit btn-submit--workout-template"
                    disabled={isSubmitting || isLoading || isUpdateLoading}
                >
                    {isSubmitting ? 'Zapisuję...' : 'Zapisz'}
                </button>
            </form>
        )
    }

    return content; 
}


export const WorkoutTemplateFormSkeleton = () => {
  return (
    <Skeleton 
      className="skeleton_workout-template--form"
    />
  )
}