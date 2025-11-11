import { useState, useEffect, FormEvent } from "react";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { setWorkout, updateWorkout, endWorkout, resetWorkout, startCurrentWorkout, fetchCurrentWorkout, updateCurrentWorkout, endCurrentWorkout } from "../../store";

import type { CurrentWorkout, WeightExercise, CardioExercise, Exercise, BodyPart } from "../../types";
import ExerciseSearch from "../exercise/ExerciseSearch";
import ExerciseDetails from "../exercise/ExerciseDetails";

import "../styles/exercise.css";
import "../styles/workoutForm.css";
import { useAuth } from "../../hooks/useAuth";
import { usePrompt } from "../../hooks/usePrompt";

interface WorkoutFreeFormProps {
    handleModalClose?: (updatedWorkout?: CurrentWorkout) => void;
}

export default function WorkoutFreeForm({ handleModalClose }: WorkoutFreeFormProps) {

  const { token } = useAuth(); 
  const { success } = usePrompt();  

  const dispatch = useAppDispatch();
  const currentWorkout = useAppSelector((state) => state.workout.currentWorkout);

  const [title, setTitle] = useState(currentWorkout?.workoutSession.name || "");
  const [weightExercises, setWeightExercises] = useState<WeightExercise[]>(currentWorkout?.workoutSession.weightExercises || []);
  const [cardioExercises, setCardioExercises] = useState<CardioExercise[]>(currentWorkout?.workoutSession.cardioExercises || []);
  const [newWeightExerciseName, setNewWeightExerciseName] = useState("");
  const [newWeightExerciseBodyPart, setNewWeightExerciseBodyPart] = useState<BodyPart>('Other');
  const [newCardioExerciseName, setNewCardioExerciseName] = useState("");
  const [showWeightExerciseForm, setShowWeightExerciseForm] = useState(false);
  const [showCardioExerciseForm, setShowCardioExerciseForm] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [newExError, setNewExError] = useState<string | null>(null);


  useEffect(() => {
    dispatch(fetchCurrentWorkout({ token }));
  }, [token, dispatch]);

  useEffect(() => {
    if (currentWorkout) {
      setTitle(currentWorkout.workoutSession.name || "");
      setWeightExercises(currentWorkout.workoutSession.weightExercises || []);
      setCardioExercises(currentWorkout.workoutSession.cardioExercises || []);
    }
  }, [currentWorkout]);

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

  const handleExerciseSelect = (exercise: Exercise) => {
    if (exercise.type === "Weight") {
      setWeightExercises([...weightExercises, { name: exercise.name, type: "weight", sets: [], bodyPart: (exercise.bodyPart) }]);
    } else {
      setCardioExercises([...cardioExercises, { name: exercise.name, type: "cardio", intensity: 0, duration: 0 }]);
    }
  };

  const updateExercise = (type: "Weight" | "Cardio", index: number, updatedExercise: WeightExercise | CardioExercise) => {
    if (type === "Weight") {
      const updated = [...weightExercises];
      updated[index] = updatedExercise as WeightExercise;
      setWeightExercises(updated);
    } else {
      const updated = [...cardioExercises];
      updated[index] = updatedExercise as CardioExercise;
      setCardioExercises(updated);
    }
  };

  const removeExercise = (type: "Weight" | "Cardio", index: number) => {
    if (type === "Weight") {
      setWeightExercises(weightExercises.filter((_, i) => i !== index));
    } else {
      setCardioExercises(cardioExercises.filter((_, i) => i !== index));
    }
  };

  const handleAddNewWeightExercise = (e: FormEvent) => {
    e.preventDefault();
    if(!newWeightExerciseName) {
      setNewExError("Podaj nazwę ćwiczenia");
      return; 
    }
    setNewExError(null);
    setWeightExercises([...weightExercises, { name: newWeightExerciseName, type: "Weight", sets: [], bodyPart: newWeightExerciseBodyPart }]);    
    setNewWeightExerciseName("");
    setShowWeightExerciseForm(false);
  };

  const handleAddNewCardioExercise = (e: FormEvent) => {
    e.preventDefault();
    if(!newCardioExerciseName) {
      setNewExError("Podaj nazwę ćwiczenia");
      return; 
    }
    setNewExError(null);
    setCardioExercises([...cardioExercises, { name: newCardioExerciseName, type: "Cardio", intensity: 0, duration: 0 }]);
    setNewCardioExerciseName("");
    setShowCardioExerciseForm(false);
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
      success(`Trening ${title} zakończony.`)
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    syncWorkout();
    if(!title) {
        setError("Podaj tytuł treningu");
        return; 
    }
    if(weightExercises.some(ex => ex.sets.some(set => (set.reps <= 0) || set.weight <= 0))) {
        setError("Ilość powtórzen i ciężar muszą być większe od 0.");
        return; 
    }
    if(cardioExercises.some(ex => ex.intensity <= 0 || ex.duration <= 0)) {
        setError("Intensywność i czas trwania muszą być większe od 0.");
        return; 
    }

    if(currentWorkout?.id){
        dispatch(updateWorkout(currentWorkout.workoutSession));
        success(`Trening ${title} zapisany.`);
    } else {
        dispatch(startCurrentWorkout({
          token, 
          workout: {
            workoutSession: {
                name: title, 
                weightExercises, 
                cardioExercises,
                startTime: new Date().toISOString(), 
                endTime: new Date().toISOString()
            }
          }
        }));
        success(`Trening ${title} rozpoczęty. Kliknij przycisk na dole aby go modyfikować.`);
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
        <h3>Ćwiczenia siłowe</h3>
        <ExerciseSearch exerciseType="weight" onExerciseSelect={handleExerciseSelect} />
        {showWeightExerciseForm ? (
          <div className="form-group form-group--workout-free">
            <input
              type="text"
              className="form-input"
              placeholder="Nazwa nowego ćwiczenia siłowego"
              value={newWeightExerciseName}
              onChange={(e) => setNewWeightExerciseName(e.target.value)}
              required
            />
          <select
            className="form-input"
            value={newWeightExerciseBodyPart}
            onChange={(e) => setNewWeightExerciseBodyPart(e.target.value as BodyPart)}
            required
          >
            <option value="Chest">Klatka piersiowa</option>
            <option value="Back">Plecy</option>
            <option value="Legs">Nogi</option>
            <option value="Shoulders">Barki</option>
            <option value="Arms">Ramiona</option>
            <option value="Other">Inne</option>
          </select>
            {newExError && <span className="input-validate">{newExError}</span>}
            <button type="button" className="btn--workout-template " onClick={handleAddNewWeightExercise}>Dodaj ćwiczenie</button>
            <button type="button" className="btn--workout-template btn-cancel" onClick={() => setShowWeightExerciseForm(false)}>Anuluj</button>
          </div>
          ) : (
            <button type="button" className="btn--workout-template btn-add" onClick={() => setShowWeightExerciseForm(true)}>Dodaj ćwiczenie +</button>
        )}

        {weightExercises.map((exercise, index) => (
          <div key={index} className="form-group form-group--workout-free">
            {/* <ExerciseDetails 
                index={index+1} 
                exercise={{...exercise, type: 'Weight'}} 
                onExerciseUpdate={(updatedExercise) => updateExercise("Weight", index, updatedExercise)} 
                onDelete={() => removeExercise("Weight", index)}
            /> */}
          </div>
        ))}
      </div>

      <div className="form-group">
        <h3>Ćwiczenia cardio</h3>
        <ExerciseSearch exerciseType="cardio" onExerciseSelect={handleExerciseSelect} />
        {showCardioExerciseForm ? (
            <div className="form-group form-group--workout-free">
              <input
                type="text"
                className="form-input"
                placeholder="Nazwa nowego ćwiczenia cardio"
                value={newCardioExerciseName}
                onChange={(e) => setNewCardioExerciseName(e.target.value)}
              />
              {newExError && <span className="input-validate">{newExError}</span>}
              <button type="button" className="btn--workout-template" onClick={handleAddNewCardioExercise}>Dodaj ćwiczenie</button>
              <button type="button" className="btn--workout-template btn-cancel" onClick={() => setShowCardioExerciseForm(false)}>Anuluj</button>
            </div>
          ) : (
            <button type="button" className="btn--workout-template btn-add" onClick={() => setShowCardioExerciseForm(true)}>Dodaj ćwiczenie +</button>
          )}
      </div>
        {cardioExercises.map((exercise, index) => (
          <div key={index} className="form-group form-group--workout-free">
            {/* <ExerciseDetails 
                index={index+1} 
                exercise={exercise} 
                onExerciseUpdate={(updatedExercise) => updateExercise("Cardio", index, updatedExercise)} 
                onDelete={() => removeExercise("Cardio", index)}
            /> */}
          </div>
        ))}

      {error && <span className="input-validate">{error}</span> }
      <div className="workout-actions">
        <button type="submit" className="btn-submit btn-submit-workout">Zapisz trening</button>
        {currentWorkout?.id ? <button type="button" className="btn-cancel" onClick={handleWorkoutEnd}>Zakończ trening</button> : ''}
      </div>
    </form>
  );
}