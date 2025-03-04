import { FormEvent, useState } from 'react'; 
import { FaTrashAlt } from "react-icons/fa";

import type { WorkoutTemplate } from '../../types';
import { addWorkoutTemplate, updateWorkoutTemplate } from '../../services/WorkoutService';

export type WorkoutTemplateFormValues = {
    id?: number;
    name: string;
    weightExercises: string[]; 
    cardioExercises: string[];
}

interface WorkoutTemplateFormProps {
    initialData?: WorkoutTemplate; 
    handleModalClose: (formSubmitted?: boolean) => void; 
    handleSubmit: (formValues: WorkoutTemplateFormValues, add?: boolean) => void; 
}

export default function WorkoutTemplateForm({ initialData, handleModalClose, handleSubmit }: WorkoutTemplateFormProps) {

    const [weightExercises, setWeightExercises] = useState(initialData?.weightExercises || ['']); 
    const [cardioExercises, setCardioExercises] = useState(initialData?.cardioExercises || ['']); 
    // const [cardioExercises, setCardioExercises] = useState(initialData?.cardioExercises || [{ name: "" }]); 
    const [title, setTitle] = useState<string>(initialData?.name || ''); 

    const addExercise = (type: string) => {
        type === 'weight' 
        ? setWeightExercises([...weightExercises, ''])
        : setCardioExercises([...cardioExercises, ''])
    }

    const updateExercise = (type: string, index: number, value: string) => {
        if(type === 'weight'){
            const updatedExercises = [...weightExercises]; 
            updatedExercises[index] = value; 
            setWeightExercises(updatedExercises); 
        } else {
            const updatedExercises = [...cardioExercises]; 
            updatedExercises[index] = value; 
            setCardioExercises(updatedExercises); 
        }
    }

    const removeExercise = (type: string, index: number) => {
        if(type === 'weight'){
            const updatedExercises = weightExercises.filter((_, i) => i !== index); 
            setWeightExercises(updatedExercises); 
        } else {
            const updatedExercises = cardioExercises.filter((_, i) => i !== index); 
            setCardioExercises(updatedExercises);
        }
    }

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault(); 
        initialData ? await handleSubmit({
            id: initialData.id,
            name: title, 
            weightExercises: weightExercises, 
            cardioExercises: cardioExercises
        })
        : await handleSubmit({
            name: title, 
            weightExercises: weightExercises, 
            cardioExercises: cardioExercises
        }, true); 

        handleModalClose(true); 
    }

    return (
        <form 
            className="form form--workout-template"
            onSubmit={onSubmit}
        >
            <h2 className="form-title">Szablon treningu</h2>
            <div className="form-group-wrapper">
                <div className="form-group form-group--workout-template">
                    <input 
                        required
                        type="text" 
                        className="form-input form-input--workout-template form-input--workout-template-title"
                        placeholder="Tytuł treningu"
                        value={title}
                        onChange={(e: FormEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)}
                    />
                </div>
                <div className="workout-template--exercises">
                    <div className="workout-template--exercises-title">Ćwiczenia siłowe</div>
                    {weightExercises.map((exercise, index) => (
                        <div
                            key={index}
                            className="form-group form-group--workout-template"
                        >
                            <input 
                                required
                                type="text" className="form-input form-input--workout-template" 
                                placeholder={`Ćwiczenie nr ${index + 1}`}
                                value={exercise}
                                onChange={(e: React.FormEvent<HTMLInputElement>) => updateExercise('weight', index, e.currentTarget.value)}
                            />
                            <button 
                                type="button"   
                                className="btn btn-remove"
                                onClick={() => removeExercise('weight', index)}
                            >
                                <FaTrashAlt />
                            </button>
                        </div>
                    ))}

                    <button 
                        type="button"
                        className="btn--workout-template btn-add--workout-template"
                        onClick={() => addExercise('weight')}
                    >
                        Dodaj ćwiczenie +
                    </button>
                </div>
                <div className="workout-template--exercises">
                    <div className="workout-template--exercises-title">Ćwiczenia cardio</div>
                    {cardioExercises.map((exercise, index) => (
                        <div
                            key={index}
                            className="form-group form-group--workout-template"
                        >
                            <input 
                                required
                                type="text" className="form-input form-input--workout-template" 
                                placeholder={`Ćwiczenie nr ${index + 1}`}
                                value={exercise}
                                onChange={(e: React.FormEvent<HTMLInputElement>) => updateExercise('cardio', index, e.currentTarget.value)}
                            />
                            <button 
                                type="button"   
                                className="btn btn-remove"
                                onClick={() => removeExercise('cardio', index)}
                            >
                                <FaTrashAlt />
                            </button>
                        </div>
                    ))}

                    <button 
                        type="button"
                        className="btn--workout-template btn-add--workout-template"
                        onClick={() => addExercise('weight')}
                    >
                        Dodaj ćwiczenie +
                    </button>
                </div>
            </div>

            <button 
                type="submit"
                className="btn-submit btn-submit--workout-template"
            >
                Zapisz
            </button>
        </form>
    )
}