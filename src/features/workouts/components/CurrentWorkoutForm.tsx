import { useState } from "react";
import * as z from 'zod'; 
import type { ExerciseDefinition } from "../../../types";
import ExerciseDetails from "../../exercise/components/ExerciseDetails";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AddExerciseModal from "@/features/modal/components/exercise/AddExerciseModal";

interface WorkoutFreeFormProps {
}

const CurrentWorkoutFormSchema = z.object({
  startedAt: z.date().nonoptional(), 
  performedExercises: z.array(z.object({
    exerciseId: z.number(),
    name: z.string().min(1, { message: 'Ćwiczenie musi mieć nazwę' }), 
    unit: z.string(),
    sets: z.array(z.object({
      setNumber: z.number(), 
      reps: z.number().optional(), 
      weight: z.number().optional(), 
      duration: z.number().optional(), 
    }))
  }))
})

type CurrentWorkoutFormValues = z.infer<typeof CurrentWorkoutFormSchema>; 

export default function CurrentWorkoutForm({ }: WorkoutFreeFormProps) {

  const [isSearchOpen, setIsSearchOpen] = useState(false); 

  const {
    register, 
    control, 
    handleSubmit, 
    formState: { errors, isSubmitting }, 
    trigger, 
    setError
  } = useForm<CurrentWorkoutFormValues>({
    resolver: zodResolver(CurrentWorkoutFormSchema), 
    defaultValues: {
      startedAt: new Date(), 
      performedExercises: []
    }, 
    mode: 'onBlur'
  })

  const { fields, append, remove } = useFieldArray({
    control, 
    name: 'performedExercises'
  })

  const handleExerciseSelect = (exercise: ExerciseDefinition) => {
    if(fields.some(ex => ex.exerciseId === exercise.id)){
      setError('performedExercises', { message: 'Nie można duplikować ćwiczeń' })
      return; 
    }

    append({
      exerciseId: exercise.id, 
      name: exercise.name, 
      unit: exercise.unit, 
      sets: [
        {
          setNumber: 1, 
        }
      ]
    })
  }

  const onSubmit = (data: CurrentWorkoutFormValues) => {
    console.log({
      ...data, 
      startedAt: data.startedAt.toISOString()
    }); 
  }

  const onError = () => {
    console.log('err:', errors); 
    console.log('data', fields); 
  }

  return (
    <form className="form form_current-workout" onSubmit={handleSubmit(onSubmit, onError)}>
      <h2 className="form_title">Trening wolny</h2>

      <div className="form_group">
        <div className="form_group-header">
          <h3>Ćwiczenia</h3>
          <button 
            type="button" 
            className="form_btn-secondary btn_exercise-add"
            onClick={() => setIsSearchOpen(true)}
          >+</button>
        </div>
        {fields.map((ex, idx) => (
          <ExerciseDetails<CurrentWorkoutFormValues>
            key={ex.id}
            index={idx}
            exercise={ex}
            control={control}
            name={`performedExercises.${idx}`}
            />
          ))}
      </div>
      <div className="form_group">
      </div>
      <AddExerciseModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onExerciseSelect={handleExerciseSelect}
      />
      {
        errors 
        && 
        Object.entries(errors).map((err, idx) => (
          <span key={idx} className="form_error">{err[1].message}</span>
        ))
      }
      <div className="workout-actions">
        <button type="submit" className="form_btn-submit">Zapisz trening</button>
        {/* {currentWorkout?.id ? <button type="button" className="btn-cancel">Zakończ trening</button> : ''} */}
      </div>
    </form>
  );
}