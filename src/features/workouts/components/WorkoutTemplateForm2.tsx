import '../styles/workoutForm.css';
import { FormEvent, useState } from 'react'; 
import { FaTrashAlt } from "react-icons/fa";

import type { BodyPart, Exercise, ExerciseDefinition, WeightExercise, WorkoutTemplate } from '../../../types';
import ExerciseSearch from '../../exercise/components/ExerciseSearch';

export type WorkoutTemplateFormValues = {
    id?: number;
    name: string;
    exercises: Exercise[];
}

export interface WorkoutTemplateFormProps {
    initialData?: WorkoutTemplate; 
}

export default function WorkoutTemplateForm2({ initialData }: WorkoutTemplateFormProps) {

    const [exercises, setExercises] = useState<Exercise[]>(initialData?.exercises || [] as Exercise[]);
    const [title, setTitle] = useState<string>(initialData?.name || '');
    const [error, setError] = useState<string | null>(null);

    const addExercise = () => {
        const newExercise: Exercise = { name: '', type: 'Weight', bodyPart: { name: 'Other' } };
        // const newExercise: Exercise = { name: '', type: 'Weight', bodyPart: 'Other' };
        setExercises([...exercises, newExercise]);
    }

    const updateExercise = (index: number, field: string, value: string) => {
        const updatedExercises = [...exercises];
        if (field === 'name') {
            updatedExercises[index].name = value;
        } else if (field === 'type') {
            updatedExercises[index].type = value as 'Weight' | 'Cardio';
        } else if (field === 'bodyPart') {
            updatedExercises[index].bodyPart.name = value;
            // updatedExercises[index].bodyPart = value as BodyPart;
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
            </div>
            <button 
                type="submit"
                className="btn-submit btn-submit--workout-template"
                >
                Zapisz
            </button>
            { error && <span className="input-validate">{error}</span> }
        </form>
    )
}
