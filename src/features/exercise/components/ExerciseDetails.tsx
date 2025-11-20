import { FormEvent, useState } from "react";
import { CardioExercise, WeightExercise } from "../../../types";
import { FaTrashAlt } from "react-icons/fa";
import '../styles/exercise.css';
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { removeExercise, updateExerciseDetails } from "../../../store";

interface ExerciseDetailsProps {
    index: number; 
    exercise: WeightExercise | CardioExercise;
}

export default function ExerciseDetails({ index, exercise }: ExerciseDetailsProps) {

  const dispatch = useAppDispatch(); 

  const [details, setDetails] = useState(exercise);

  const handleDetailChange = (field: string, value: any) => {
    const updatedDetails = { ...details, [field]: value };
    setDetails(updatedDetails);
    // onExerciseUpdate(updatedDetails);
    handleDetailsUpdate(updatedDetails);
  };

  const handleCardioStatChange = (field: string, value: number) => {
    const updatedCardio = { ...details, [field]: (isNaN(value) ? 0 : value) };
    setDetails(updatedCardio);
    // onExerciseUpdate(updatedCardio);
    handleDetailsUpdate(updatedCardio);
  }
  const handleSetChange = (index: number, field: string, value: number) => {
    const updatedSets = (details as WeightExercise).sets.map((set, i) => 
      i === index ? { ...set, [field]: (isNaN(value) ? 0 : value) } : set
    );
    handleDetailChange("sets", updatedSets);
  };

  const handleSetAdd = (e: FormEvent) => {
    e.preventDefault();
    const newSet = { reps: 0, weight: 0 };
    handleDetailChange("sets", [...(details as WeightExercise).sets, newSet]);
  };
  const handleSetRemove = (index: number) => {
    const updatedSets = (details as WeightExercise).sets.filter((_, i) => i !== index);
    handleDetailChange("sets", updatedSets);
  }


  const handleDetailsUpdate = (ex: WeightExercise | CardioExercise) => {
    dispatch(updateExerciseDetails(ex)); 
  }

  const handleDelete = () => {
    console.log('delete')
    dispatch(removeExercise({ index, exercise })); 
  }

  return (
    <div className="exercise-details">
        <div className="exercise-details--header">
            <h3 className="exercise-details--title">{index}. {exercise.name}</h3>
            <button type="button" className="btn btn-remove" onClick={handleDelete}>
              <FaTrashAlt />
            </button>
        </div>
        {exercise.type === "Weight" ? (
            <div className="exercise-details--weight">
            {(details as WeightExercise).sets.map((set, index) => (
                <div key={index} className="exercise-detail exercise-detail--set">
                    <h4 className="exercise-details--title">Seria {index + 1}</h4>
                    <input
                        type="number"
                        placeholder="Powtórzenia"
                        value={set.reps}
                        onChange={(e) => handleSetChange(index, "reps", parseInt(e.target.value))}
                        className="exercise-detail--input"
                    />
                    X
                    <input
                        type="number"
                        placeholder="Ciężar"
                        value={set.weight}
                        onChange={(e) => handleSetChange(index, "weight", parseInt(e.target.value))}
                        className="exercise-detail--input"
                    />
                    kg
                    <button type="button" className="btn btn-remove" onClick={() => handleSetRemove(index)}>
                        <FaTrashAlt />
                    </button>
                </div>
            ))}
            <button className="btn-add btn-add" onClick={handleSetAdd}>Dodaj serię</button>
            </div>
        ) : (
            <div className="exercise-details--cardio">
            <label className="form-label">Intensywność</label>
            <input
                type="number"
                placeholder="Intensywność"
                value={(details as CardioExercise).intensity}
                onChange={(e) => handleCardioStatChange("intensity", parseInt(e.target.value))}
                className="exercise-detail--input"
                max={10}
            />
            <label className="form-label">Czas trwania (min)</label>
            <input
                type="number"
                placeholder="Czas trwania (min)"
                value={(details as CardioExercise).duration}
                onChange={(e) => handleCardioStatChange("duration", parseInt(e.target.value))}
                className="exercise-detail--input"
            />
            </div>
        )}
    </div>
  );
}