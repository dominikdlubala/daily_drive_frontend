import { useState, useEffect, FormEvent } from "react";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { setWorkout, updateWorkout, endWorkout, resetWorkout, startCurrentWorkout, fetchCurrentWorkout, updateCurrentWorkout } from "../../store";

import type { CurrentWorkout, WeightExercise, CardioExercise } from "../../types";
import ExerciseSearch from "../exercise/ExerciseSearch";
import ExerciseDetails from "../exercise/ExerciseDetails";

import "../styles/exercise.css";
import "../styles/workoutForm.css";

interface WorkoutFreeFormProps {
    handleModalClose: (updatedWorkout?: CurrentWorkout) => void;
}

export default function WorkoutFreeForm2({ handleModalClose }: WorkoutFreeFormProps) {
  const dispatch = useAppDispatch();
  const currentWorkout = useAppSelector((state) => state.workout.currentWorkout);

  const [title, setTitle] = useState(currentWorkout?.workoutSession.name || "");
  const [weightExercises, setWeightExercises] = useState<WeightExercise[]>(currentWorkout?.workoutSession.weightExercises || []);
  const [cardioExercises, setCardioExercises] = useState<CardioExercise[]>(currentWorkout?.workoutSession.cardioExercises || []);
  const [newWeightExerciseName, setNewWeightExerciseName] = useState("");
  const [newCardioExerciseName, setNewCardioExerciseName] = useState("");
  const [showWeightExerciseForm, setShowWeightExerciseForm] = useState(false);
  const [showCardioExerciseForm, setShowCardioExerciseForm] = useState(false);

  useEffect(() => {
    dispatch(fetchCurrentWorkout());
  }, [dispatch]);

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
            ...currentWorkout, 
            workoutSession: {
                ...currentWorkout.workoutSession,
                name: title, 
                weightExercises, 
                cardioExercises
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

  const handleExerciseSelect = (exercise: { name: string; type: "weight" | "cardio" }) => {
    if (exercise.type === "weight") {
      setWeightExercises([...weightExercises, { name: exercise.name, type: "weight", sets: [] }]);
    } else {
      setCardioExercises([...cardioExercises, { name: exercise.name, type: "cardio", intensity: 0, duration: 0 }]);
    }
  };

  const updateExercise = (type: "weight" | "cardio", index: number, updatedExercise: WeightExercise | CardioExercise) => {
    if (type === "weight") {
      const updated = [...weightExercises];
      updated[index] = updatedExercise as WeightExercise;
      setWeightExercises(updated);
    } else {
      const updated = [...cardioExercises];
      updated[index] = updatedExercise as CardioExercise;
      setCardioExercises(updated);
    }
  };

  const removeExercise = (type: "weight" | "cardio", index: number) => {
    if (type === "weight") {
      setWeightExercises(weightExercises.filter((_, i) => i !== index));
    } else {
      setCardioExercises(cardioExercises.filter((_, i) => i !== index));
    }
  };

  const handleAddNewWeightExercise = (e: FormEvent) => {
    e.preventDefault();
    setWeightExercises([...weightExercises, { name: newWeightExerciseName, type: "weight", sets: [] }]);
    setNewWeightExerciseName("");
    setShowWeightExerciseForm(false);
  };

  const handleAddNewCardioExercise = (e: FormEvent) => {
    e.preventDefault();
    setCardioExercises([...cardioExercises, { name: newCardioExerciseName, type: "cardio", intensity: 0, duration: 0 }]);
    setNewCardioExerciseName("");
    setShowCardioExerciseForm(false);
  };


  const handleWorkoutEnd = () => {
    if (currentWorkout) {
        console.log('end');
        dispatch(endWorkout()); 
        dispatch(resetWorkout());
        handleModalClose && handleModalClose();
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    syncWorkout();

    if(currentWorkout?.id){
        dispatch(updateWorkout(currentWorkout.workoutSession));
    }
    else if (currentWorkout && !currentWorkout.id ){
        dispatch(startCurrentWorkout(currentWorkout)); 
    }
    dispatch(resetWorkout());
    handleModalClose();
  };

  return (
    <form onSubmit={handleSubmit} className="form form--workout-free">
      <h2 className="form-title">Trening wolny</h2>
      <div className="form-group-wrapper">
        <div className="form-group form-group--workout-free">
          <input
            required
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
        {weightExercises.map((exercise, index) => (
          <div key={index} className="form-group form-group--workout-free">
            <ExerciseDetails 
                index={index+1} 
                exercise={{...exercise, type: 'weight'}} 
                onExerciseUpdate={(updatedExercise) => updateExercise("weight", index, updatedExercise)} 
                onDelete={() => removeExercise("weight", index)}
            />
          </div>
        ))}
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
              <button type="button" className="btn--workout-template " onClick={handleAddNewWeightExercise}>Dodaj ćwiczenie</button>
              <button type="button" className="btn--workout-template btn-cancel" onClick={() => setShowWeightExerciseForm(false)}>Anuluj</button>
            </div>
          ) : (
            <button type="button" className="btn--workout-template btn-add--workout-template" onClick={() => setShowWeightExerciseForm(true)}>Dodaj ćwiczenie +</button>
          )}
      </div>

      <div className="form-group">
        <h3>Ćwiczenia cardio</h3>
        <ExerciseSearch exerciseType="cardio" onExerciseSelect={handleExerciseSelect} />
        {cardioExercises.map((exercise, index) => (
          <div key={index} className="form-group form-group--workout-free">
            <ExerciseDetails 
                index={index+1} 
                exercise={exercise} 
                onExerciseUpdate={(updatedExercise) => updateExercise("cardio", index, updatedExercise)} 
                onDelete={() => removeExercise("cardio", index)}
            />
          </div>
        ))}
        {showCardioExerciseForm ? (
            <div className="form-group form-group--workout-free">
              <input
                type="text"
                className="form-input"
                placeholder="Nazwa nowego ćwiczenia cardio"
                value={newCardioExerciseName}
                onChange={(e) => setNewCardioExerciseName(e.target.value)}
                required
              />
              <button type="button" className="btn--workout-template" onClick={handleAddNewCardioExercise}>Dodaj ćwiczenie</button>
              <button type="button" className="btn--workout-template btn-cancel" onClick={() => setShowCardioExerciseForm(false)}>Anuluj</button>
            </div>
          ) : (
            <button type="button" className="btn--workout-template btn-add--workout-template" onClick={() => setShowCardioExerciseForm(true)}>Dodaj ćwiczenie +</button>
          )}
      </div>

      <div className="workout-actions">
        <button type="submit" className="btn-submit--workout">Zapisz trening</button>
        {currentWorkout && <button type="button" className="btn-end--workout" onClick={handleWorkoutEnd}>Zakończ trening</button>}
      </div>
    </form>
  );
}