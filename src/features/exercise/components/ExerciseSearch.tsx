import '../styles/exercise.scss';
import { FormEvent, useEffect, useRef, useState } from "react";
import { fetchExercisesByName } from "../../../services/ExerciseService";
import { Exercise, ExerciseDefinition } from "../../../types";
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { openModal } from '../../../store';
import { useLazyGetExerciseByNameQuery } from 'src/api/queries/exerciseApi';

interface ExerciseSearchProps {
    exerciseType?: "weight" | "cardio";
    onExerciseSelect: (exercise: Exercise) => void;
}

export default function ExerciseSearch({ exerciseType, onExerciseSelect }: ExerciseSearchProps) {
  const dispatch = useAppDispatch(); 

  const [triggerSearch, { isLoading }] = useLazyGetExerciseByNameQuery(); 

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<ExerciseDefinition[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    if(!searchTerm) {
      setError('Wpisz nazwę ćwiczenia');
      return; 
    } 
    // const { data, error } = await fetchExercisesByName(searchTerm, exerciseType);
    const response = await triggerSearch(searchTerm); 


    if(response.data?.data) {
      if(response.data.data.length === 0) {
        setError('Nie znaleziono takiego ćwiczenia')
        return; 
      }
      setSearchResults(response.data.data);
      setShowResults(true); 
      setError(null);
    }
  };

  const handleSubmit = (exercise: Exercise) => {
    onExerciseSelect(exercise); 
    setShowResults(false);
    setSearchTerm(""); 
    setSearchResults([]); 
  }

  return (
    <div className="exercise-search">
      <div className="exercise-search__input">
        <input
          type="text"
          placeholder="Wyszukaj ćwiczenie"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="exercise-search__button" onClick={handleSearch}>Szukaj</button>
      </div>
      {error && <span className="exercise-search__error">{error}</span> }

      {searchResults?.length > 0 && showResults && (
        <ul className="exercise-search__results" ref={resultsRef}>
          {searchResults.map((exercise, index) => (
            <li className="exercise-search__result-item" key={index} 
              // onClick={() => handleSubmit(exercise)}
            >
              {exercise.name}
            </li>
          ))}
        </ul>
      )}

      <div className="exercise-search__create-wrapper">
        <span>Jeśli Twojego ćwiczenia nie ma na liście: </span>
        <button 
          className="button exercise-search__button exercise-search__button--add"
          onClick={() => dispatch(openModal({ type: 'CREATE_EXERCISE' }))}  
        >Dodaj nowe +</button>
      </div>
    </div>
  );
}