import { useState } from 'react'; 
import { FaTrashAlt } from "react-icons/fa";

export default function WorkoutTemplateForm() {

    const [exercises, setExercises] = useState([{ name: "" }]); 
    const [title, setTitle] = useState<string>(''); 

    const addExercise = () => {
        setExercises([...exercises, { name: "" }]); 
    }

    const updateExercise = (index: number, value: string) => {
        const updatedExercises = [...exercises]; 
        updatedExercises[index].name = value; 
        setExercises(updatedExercises); 
    }

    const removeExercise = (index: number) => {
        const updatedExercises = exercises.filter((_, i) => i !== index); 
        setExercises(updatedExercises); 
    }

    return (
        <form 
            className="form form--workout-template"
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
                        onChange={(e: React.FormEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)}
                    />
                </div>
                {exercises.map((exercise, index) => (
                    <div
                        key={index}
                        className="form-group form-group--workout-template"
                    >
                        <input 
                            required
                            type="text" className="form-input form-input--workout-template" 
                            placeholder={`Ćwiczenie nr ${index + 1}`}
                            value={exercise.name}
                            onChange={(e: React.FormEvent<HTMLInputElement>) => updateExercise(index, e.currentTarget.value)}
                        />
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
                    className="btn--workout-template btn-add--workout-template"
                    onClick={() => addExercise()}
                >
                    Dodaj ćwiczenie +
                </button>
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