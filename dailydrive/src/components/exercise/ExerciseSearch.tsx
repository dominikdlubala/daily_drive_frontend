import '../styles/exercise.css';
import { FormEvent, useState } from "react";
import { fetchExercisesByName } from "../../services/ExerciseService";
import { Exercise } from "../../types";

interface ExerciseSearchProps {
    exerciseType?: "weight" | "cardio";
    onExerciseSelect: (exercise: Exercise) => void;
}

export default function ExerciseSearch({ exerciseType, onExerciseSelect }: ExerciseSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Exercise[]>([]);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    const { data, error } = await fetchExercisesByName(searchTerm, exerciseType);
    if(error) {
        console.error(error.message);
    }
    if(data) {
        setSearchResults(data);
    }
  };

  const handleSubmit = (exercise: Exercise) => {
    onExerciseSelect(exercise); 
    setSearchTerm(""); 
    setSearchResults([]); 
  }

  return (
    <div className="search exercise-search">
      <input
        type="text"
        placeholder="Wyszukaj ćwiczenie"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Szukaj</button>

      {searchResults.length > 0 && (
        <ul>
          {searchResults.map((exercise, index) => (
            <li key={index} onClick={() => handleSubmit(exercise)}>
              {exercise.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}