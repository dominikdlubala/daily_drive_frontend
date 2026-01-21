import { useState, useEffect, FormEvent } from "react";

import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { setWorkout, updateWorkout, endWorkout, resetWorkout, startCurrentWorkout, fetchCurrentWorkout, updateCurrentWorkout, endCurrentWorkout, openModal, checkOpenModals } from "../../../store";

import type { CurrentWorkout, WeightExercise, CardioExercise, Exercise, BodyPart, WorkoutSession } from "../../../types";
import ExerciseSearch from "../../exercise/components/ExerciseSearch";
import ExerciseDetails from "../../exercise/components/ExerciseDetails";

// import "../styles/exercise.css";
import "../styles/workoutForm.css";
import { useAuth } from "../../../hooks/useAuth";
import { openExerciseModal } from "../../../store/slices/exercise/slice";

interface WorkoutFreeFormProps {
    handleModalClose?: (updatedWorkout?: CurrentWorkout) => void;
}

export default function WorkoutForm({ handleModalClose }: WorkoutFreeFormProps) {

  const { token } = useAuth(); 
  const dispatch = useAppDispatch();
  
    useEffect(() => {
      dispatch(setWorkout({
        workoutSession: {
          name: title, 
          weightExercises: [], 
          cardioExercises: [],
          startTime: new Date().toISOString(), 
          endTime: new Date().toISOString()
        }
      }))
    }, [token])

  const currentWorkout = useAppSelector((state) => state.workout.currentWorkout);
  const { weightExercises, cardioExercises } = useAppSelector((state) => state.workout.currentWorkout?.workoutSession) as WorkoutSession;
  // const { weightExercises, cardioExercises } = { weightExercises: [], cardioExercises: []} as { weightExercises: WeightExercise[], cardioExercises: CardioExercise[] }; 

  const [title, setTitle] = useState(currentWorkout?.workoutSession.name || "");

  const [error, setError] = useState<string | null>(null);
  const [newExError, setNewExError] = useState<string | null>(null);


  useEffect(() => {
    console.log(currentWorkout); 
    // dispatch(fetchCurrentWorkout({ token }));
  }, [token, dispatch, currentWorkout]);

  const syncWorkout = () => {

    if (currentWorkout) {
        dispatch(updateCurrentWorkout({
            token, 
            workout: {
              ...currentWorkout, 
              workoutSession: {
                  ...currentWorkout.workoutSession,
                  name: title, 
                  weightExercises, 
                  cardioExercises
              }
            }
        }))
        dispatch(updateWorkout({
          name: title,
          weightExercises,
          cardioExercises,
        }
      ));
    } else {
        dispatch(setWorkout({
            workoutSession: {
                name: title, 
                weightExercises, 
                cardioExercises,
                startTime: new Date().toISOString(), 
                endTime: new Date().toISOString()
            }
        }))
    }
  };


  const handleWorkoutEnd = () => {
    if(!title) {
      setError("Podaj tytuł treningu");
      return; 
    }
    if(weightExercises.some(ex => ex.sets.some(set => (set.reps === 0) || set.weight === 0))) {
      setError("Ilość powtórzen i ciężar muszą być większe od 0.");
      return; 
    }
    if(cardioExercises.some(ex => ex.intensity === 0 || ex.duration === 0)) {
      setError("Intensywność i czas trwania muszą być większe od 0.");
      return; 
    }
    if (currentWorkout) {
      dispatch(updateCurrentWorkout({
        token, 
        workout: {
          ...currentWorkout, 
          workoutSession: {
              ...currentWorkout.workoutSession,
              name: title, 
              endTime: new Date().toISOString(),
              weightExercises, 
              cardioExercises
          }
        }
      }))
      dispatch(endCurrentWorkout({token, id: currentWorkout.id as number}));
      dispatch(endWorkout()); 
      dispatch(resetWorkout());
      handleModalClose && handleModalClose();
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    syncWorkout();
    if(!title) {
        setError("Podaj tytuł treningu");
        return; 
    }

    if(currentWorkout?.id){
        dispatch(updateWorkout(currentWorkout.workoutSession));
    } else {
    }
    dispatch(resetWorkout());
    handleModalClose && handleModalClose();
  };

  return (
    <form onSubmit={handleSubmit} className="form form--workout-free">
      <h2 className="form-title">Trening wolny</h2>
      <div className="form-group-wrapper">
        <div className="form-group form-group--workout-free">
          <label className="form-input--label">Nazwa treningu</label>
          <input
            type="text"
            className="form-input form-input--workout-free-title"
            placeholder="Tytuł treningu"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>


      <div className="form-group">
        <h3>Ćwiczenia</h3>
          <button type="button" className="btn--workout-template btn-add" onClick={() => dispatch(openModal({ type: 'ADD_EXERCISE' }))}>Dodaj ćwiczenie +</button>
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

      {error && <span className="input-validate">{error}</span> }
      <div className="workout-actions">
        <button type="submit" className="btn-submit btn-submit-workout">Zapisz trening</button>
        {currentWorkout?.id ? <button type="button" className="btn-cancel" onClick={handleWorkoutEnd}>Zakończ trening</button> : ''}
      </div>
    </form>
  );
}