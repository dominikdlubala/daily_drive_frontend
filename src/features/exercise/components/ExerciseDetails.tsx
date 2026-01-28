import { AddPerformedExerciseDTO, CardioExercise, WeightExercise } from "../../../types";
import { FaTrashAlt } from "react-icons/fa";
import '../styles/exercise.css';

interface ExerciseDetailsProps {
    index: number; 
    exercise: AddPerformedExerciseDTO;
}

export default function ExerciseDetails({ index, exercise }: ExerciseDetailsProps) {


  return (
    <div className="exercise-details">
        <div className="exercise-details--header">
            <h3 className="exercise-details--title">{index+1}. {exercise.name}</h3>
            <button type="button" className="btn btn-remove">
              <FaTrashAlt />
            </button>
        </div>
        {exercise.unit === "KGxREPS" ? (
            <div className="exercise-details--weight">
            {exercise.sets.map((set, index) => (
                <div key={index} className="exercise-detail exercise-detail--set">
                    <h4 className="exercise-details--title">Seria {index + 1}</h4>
                    <input
                        type="number"
                        placeholder="Powtórzenia"
                        value={set.reps}
                        // onChange={}
                        className="exercise-detail--input"
                    />
                    X
                    <input
                        type="number"
                        placeholder="Ciężar"
                        value={set.weight}
                        // onChange={(e) => handleSetChange(index, "weight", parseInt(e.target.value))}
                        className="exercise-detail--input"
                    />
                    kg
                    <button type="button" className="btn btn-remove">
                        <FaTrashAlt />
                    </button>
                </div>
            ))}
            <button type="button" className="btn-add btn-add">Dodaj serię</button>
            </div>
        ) : (
            <div className="exercise-details--cardio">
              <label className="form-label">Intensywność</label>
              <input
                  type="number"
                  placeholder="Intensywność"
                  // value={(details as CardioExercise).intensity}
                  // onChange={(e) => handleCardioStatChange("intensity", parseInt(e.target.value))}
                  className="exercise-detail--input"
                  max={10}
              />
              <label className="form-label">Czas trwania (min)</label>
              <input
                  type="number"
                  placeholder="Czas trwania (min)"
                  // value={(details as CardioExercise).duration}
                  // onChange={(e) => handleCardioStatChange("duration", parseInt(e.target.value))}
                  className="exercise-detail--input"
              />
            </div>
        )}
    </div>
  );
}