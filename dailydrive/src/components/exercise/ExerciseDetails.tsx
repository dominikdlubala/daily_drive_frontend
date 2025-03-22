import { FormEvent, useState } from "react";
import { CardioExercise, WeightExercise } from "../../types";
import { FaTrashAlt } from "react-icons/fa";
import '../styles/exercise.css';

interface ExerciseDetailsProps {
    index: number; 
    exercise: WeightExercise | CardioExercise;
    onExerciseUpdate: (updatedExercise: WeightExercise | CardioExercise) => void;
    onDelete: () => void;
}

export default function ExerciseDetails({ index, exercise, onExerciseUpdate, onDelete }: ExerciseDetailsProps) {
  const [details, setDetails] = useState(exercise);

  const handleDetailChange = (field: string, value: any) => {
    const updatedDetails = { ...details, [field]: value };
    setDetails(updatedDetails);
    onExerciseUpdate(updatedDetails);
  };

  const handleSetChange = (index: number, field: string, value: number) => {
    const updatedSets = (details as WeightExercise).sets.map((set, i) => 
      i === index ? { ...set, [field]: value } : set
    );
    handleDetailChange("sets", updatedSets);
  };

  const handleSetAdd = (e: FormEvent) => {
    e.preventDefault();
    const newSet = { reps: 0, weight: 0 };
    handleDetailChange("sets", [...(details as WeightExercise).sets, newSet]);
  };

  return (
    <div className="exercise-details">
        <div className="exercise-details--header">
            <h3 className="exercise-details--title">{index}. {exercise.name}</h3>
            <button type="button" className="btn btn-remove" onClick={onDelete}>
              <FaTrashAlt />
            </button>
        </div>
        {exercise.type === "weight" ? (
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
                </div>
            ))}
            <button className="btn-add btn-add--workout-template" onClick={handleSetAdd}>Dodaj serię</button>
            </div>
        ) : (
            <div className="exercise-details--cardio">
            <h4 className="exercise-details--title">Intensywność i czas trwania</h4>
            <input
                type="number"
                placeholder="Intensywność"
                value={(details as CardioExercise).intensity}
                onChange={(e) => handleDetailChange("intensity", parseInt(e.target.value))}
                className="exercise-detail--input"
            />
            <input
                type="number"
                placeholder="Czas trwania (min)"
                value={(details as CardioExercise).duration}
                onChange={(e) => handleDetailChange("duration", parseInt(e.target.value))}
                className="exercise-detail--input"
            />
            </div>
        )}
    </div>
  );
}