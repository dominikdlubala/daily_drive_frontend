import '../styles/exercise.css';
import { FormEvent, useEffect, useRef, useState } from "react";
import { fetchExercisesByName } from "../../services/ExerciseService";
import { Exercise } from "../../types";

interface ExerciseSearchProps {
    exerciseType?: "weight" | "cardio";
    onExerciseSelect: (exercise: Exercise) => void;
}

export default function ExerciseSearch({ exerciseType, onExerciseSelect }: ExerciseSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Exercise[]>([]);
  const [showResults, setShowResults] = useState(false);

  const resultsRef = useRef<HTMLUListElement | null>(null); 

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if(resultsRef.current && !resultsRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    }
    showResults && document.addEventListener('mousedown', handleClickOutside);
  
    return () => document.removeEventListener('mousedown', handleClickOutside); 
  }, [showResults]);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    const { data, error } = await fetchExercisesByName(searchTerm, exerciseType);
    if(error) {
        console.error(error.message);
    }
    if(data) {
        setSearchResults(data);
        setShowResults(true); 
    }
  };

  const handleSubmit = (exercise: Exercise) => {
    onExerciseSelect(exercise); 
    setShowResults(false);
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

      {searchResults.length > 0 && showResults && (
        <ul ref={resultsRef}>
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