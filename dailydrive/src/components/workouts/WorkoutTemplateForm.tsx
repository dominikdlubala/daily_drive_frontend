import '../styles/workoutForm.css';
import { FormEvent, useState } from 'react'; 
import { FaTrashAlt } from "react-icons/fa";

import type { BodyPart, Exercise, WorkoutTemplate } from '../../types';
import ExerciseSearch from '../exercise/ExerciseSearch';

export type WorkoutTemplateFormValues = {
    id?: number;
    name: string;
    exercises: Exercise[];
}

interface WorkoutTemplateFormProps {
    initialData?: WorkoutTemplate; 
    handleSubmit: (formValues: WorkoutTemplateFormValues, add?: boolean) => void; 
}

export default function WorkoutTemplateForm({ initialData, handleSubmit }: WorkoutTemplateFormProps) {

    const [exercises, setExercises] = useState<Exercise[]>(initialData?.exercises || [] as Exercise[]);
    const [title, setTitle] = useState<string>(initialData?.name || '');
    const [error, setError] = useState<string | null>(null);

    const addExercise = () => {
        const newExercise: Exercise = { name: '', type: 'weight', bodyPart: 'Other' };
        setExercises([...exercises, newExercise]);
    }

    const updateExercise = (index: number, field: string, value: string) => {
        const updatedExercises = [...exercises];
        if (field === 'name') {
            updatedExercises[index].name = value;
        } else if (field === 'type') {
            updatedExercises[index].type = value as 'weight' | 'cardio';
        } else if (field === 'bodyPart') {
            updatedExercises[index].bodyPart = value as BodyPart;
        }
        setExercises(updatedExercises);
    }

    const removeExercise = (index: number) => {
        const updatedExercises = exercises.filter((_, i) => i !== index);
        setExercises(updatedExercises); 
    }

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if(exercises.some(exercise => exercise.name.trim() === '')) {
            setError('Wpisz nazwę wszystkich ćwiczeń');
            return; 
        }
        if (title.trim() === '') {
            setError('Wpisz tytuł treningu');
            return;
        }
        if(exercises.length === 0) {
            setError('Dodaj przynajmniej jedno ćwiczenie');
            return; 
        }
        await handleSubmit({
            ...initialData,
            name: title, 
            exercises
        }, !initialData); 
    }

    const handleExerciseSelect = (exercise: Exercise) => {
        setExercises([...exercises, exercise]);
    }

    return (
        <form 
            className="form form--workout-template"
            onSubmit={onSubmit}
        >
            <h2 className="form-title">Szablon treningu</h2>
            <div className="form-group-wrapper">
                <div className="form-group">
                    <label className="form-input--label">Nazwa szablonu</label>
                    <input 
                        type="text" 
                        className="form-input form-input--workout-template form-input--workout-template-title"
                        placeholder="Tytuł treningu"
                        value={title}
                        onChange={(e: FormEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)}
                    />
                </div>
                    <ExerciseSearch onExerciseSelect={handleExerciseSelect}/>
                <div className="workout-template--exercises">
                    <label className="form-input--label">Ćwiczenia</label>
                    {exercises.map((exercise, index) => (
                        <div key={index} className="form-group form-group--workout-template">
                            <input 
                                type="text"
                                className="form-input form-input--workout-template"
                                placeholder={`Ćwiczenie nr ${index + 1}`}
                                value={exercise.name}
                                onChange={(e: FormEvent<HTMLInputElement>) => updateExercise(index, 'name', e.currentTarget.value)}
                            />
                            <select 
                                className="form-select form-select--workout-template custom-select"
                                value={exercise.type}
                                onChange={(e: FormEvent<HTMLSelectElement>) => updateExercise(index, 'type', e.currentTarget.value)}
                            >
                                <option value="weight">Siłowe</option>
                                <option value="cardio">Cardio</option>
                            </select>
                            <select 
                                className="form-select form-select--workout-template custom-select"
                                style={{
                                    display: exercise.type === 'weight' ? 'block' : 'none'
                                }}
                                value={exercise.bodyPart}
                                onChange={(e: FormEvent<HTMLSelectElement>) => updateExercise(index, 'bodyPart', e.currentTarget.value)}
                            >
                                <option value="Chest">Klatka piersiowa</option>
                                <option value="Back">Plecy</option>
                                <option value="Legs">Nogi</option>
                                <option value="Shoulders">Barki</option>
                                <option value="Arms">Ramiona</option>
                                <option value="Other">Inne</option>
                            </select>
                            <button 
                                type="button"
                                className="btn btn-remove"
                                onClick={() => removeExercise(index)}
                            >
                                <FaTrashAlt />
                            </button>
                        </div>
                    ))}
                    <button 
                        type="button"
                        className="btn-add"
                        onClick={addExercise}
                    >
                        Dodaj ćwiczenie +
                    </button>
                </div>
            </div>
            { error && <span className="input-validate">{error}</span> }
            <button 
                type="submit"
                className="btn-submit btn-submit--workout-template"
            >
                Zapisz
            </button>
        </form>
    )
}
