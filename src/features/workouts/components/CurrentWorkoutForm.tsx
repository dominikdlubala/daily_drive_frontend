import { useEffect, useState } from "react";
import * as z from 'zod'; 
import { useAppSelector } from "../../../hooks/useAppSelector";
import type { CurrentWorkout, ExerciseDefinition, WorkoutSession } from "../../../types";
import ExerciseDetails from "../../exercise/components/ExerciseDetails";
import { useForm } from "react-hook-form";
import { openModal } from "@/store";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { zodResolver } from "@hookform/resolvers/zod";
import AddExerciseModal from "@/features/modal/components/exercise/AddExerciseModal";

interface WorkoutFreeFormProps {
}

const CurrentWorkoutFormSchema = z.object({
  startedAt: z.date().nonoptional(), 
  performedExercises: z.array(z.object({
    exerciseId: z.number(),
    name: z.string().min(1, { message: 'Ćwiczenie musi mieć nazwę' }), 
    sets: z.array(z.object({
      setNumber: z.number(), 
      reps: z.number().optional(), 
      weight: z.number().optional(), 
      duration: z.string().optional(), 
    }))
  }))
})

type CurrentWorkoutFormValues = z.infer<typeof CurrentWorkoutFormSchema>; 

export default function CurrentWorkoutForm({ }: WorkoutFreeFormProps) {

  const dispatch = useAppDispatch(); 

  const {
    register, 
    control, 
    handleSubmit, 
    formState: { errors, isSubmitting }, 
    trigger
  } = useForm<CurrentWorkoutFormValues>({
    resolver: zodResolver(CurrentWorkoutFormSchema), 
    defaultValues: {
      startedAt: new Date(), 
      performedExercises: []
    }
  })

  const [isSearchOpen, setIsSearchOpen] = useState(false); 

  const currentWorkout = useAppSelector((state) => state.workout.currentWorkout);

  const handleExerciseSelect = (exercise: ExerciseDefinition) => {

  }

  useEffect(() => {
    trigger('startedAt')
    trigger('performedExercises')
  }, [])

  return (
    <form className="form form--workout-free">
      <h2 className="form-title">Trening wolny</h2>

      <div className="form-group">
        <h3>Ćwiczenia</h3>
        <button 
          type="button" 
          className="btn--workout-template btn-add"
          onClick={() => setIsSearchOpen(true)}
        >Dodaj ćwiczenie +</button>
        <AddExerciseModal 
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onExerciseSelect={handleExerciseSelect}
        />
        {currentWorkout?.workoutSession.weightExercises.map((exercise, index) => (
          <div key={index} className="form-group form-group--workout-free">
            <ExerciseDetails 
              index={index} 
              exercise={{...exercise, type: 'Weight'}} 
            />
          </div>
        ))}
        {currentWorkout?.workoutSession.cardioExercises.map((exercise, index) => (
          <div key={index} className="form-group form-group--workout-free">
            <ExerciseDetails 
              index={index} 
              exercise={{...exercise, type: 'Cardio'}} 
            />
          </div>
        ))}
      </div>

      {
        errors 
        && 
        Object.entries(errors).map((err, idx) => (
          <span key={idx} className="form_error">{err[1].message}</span>
        ))
      }
      <div className="workout-actions">
        <button type="submit" className="btn-submit btn-submit-workout">Zapisz trening</button>
        {currentWorkout?.id ? <button type="button" className="btn-cancel">Zakończ trening</button> : ''}
      </div>
    </form>
  );
}