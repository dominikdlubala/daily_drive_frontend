import { useState } from 'react'; 
import { FaTrashAlt } from "react-icons/fa";

export default function WorkoutFreeForm() {

    const [exercises, setExercises] = useState([{ name: "", sets: [{ reps: 1, weight: 10 }]  }]); 
    const [title, setTitle] = useState<string>(''); 

    const addExercise = () => {
        setExercises([...exercises, { name: "", sets: [{ reps: 0, weight: 0 }] }]); 
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

    const addSet = (exerciseIndex: number) => {
        const updatedExercises = [...exercises]; 
        updatedExercises[exerciseIndex].sets.push({reps: 0, weight: 0}); 
        setExercises(updatedExercises); 
    }

    const updateSet = (exerciseIndex: number, setIndex: number, field: 'reps' | 'weight', value: number) => {
        const updatedExercises = [...exercises]; 
        updatedExercises[exerciseIndex].sets[setIndex][field] = value; 
        setExercises(updatedExercises); 
    }

    const removeSet = (exerciseIndex: number, setIndex: number) => {
        const updatedExercises = [...exercises]; 
        updatedExercises[exerciseIndex].sets = updatedExercises[exerciseIndex].sets.filter((_, index) => index !== setIndex); 
        setExercises(updatedExercises); 
    }

    return (
        <form 
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault(); 
                console.log(exercises); 
            }}
            className="form form--workout-free"
        >
            <h2 className="form-title">Trening wolny</h2>
            <div className="form-group-wrapper">
                <div className="form-group form-group--workout-free">
                    <input 
                        required
                        type="text" 
                        className="form-input form-input--workout-free form-input--workout-free-title"
                        placeholder="Tytuł treningu"
                        value={title}
                        onChange={(e: React.FormEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)}
                    />
                </div>
                {exercises.map((exercise, index) => (
                    <div
                        key={index}
                        className="form-group form-group--workout-free"
                    >
                        <div className="form-subgroup">
                            <input 
                                required
                                type="text" className="form-input form-input--workout-free" 
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
                        {exercise.sets.map((set, setIndex) => (
                            <div key={setIndex} className="form-subgroup form-subgroup--set">
                                <label className="form-input--label">Seria {setIndex + 1}</label>
                                <input 
                                    required
                                    type="text" className="form-input form-input--workout-free form-input--set" 
                                    placeholder={`Powt.`}
                                    value={set.reps}
                                    onChange={(e: React.FormEvent<HTMLInputElement>) => updateSet(index, setIndex, 'reps', parseInt(e.currentTarget.value))}
                                />
                                <input 
                                    required
                                    type="text" className="form-input form-input--workout-free form-input--set" 
                                    placeholder={`Kg`}
                                    value={set.weight}
                                    onChange={(e: React.FormEvent<HTMLInputElement>) => updateSet(index, setIndex, 'weight', parseInt(e.currentTarget.value))}
                                />
                                <button 
                                    type="button"   
                                    className="btn btn-remove"
                                    onClick={() => removeSet(index, setIndex)}
                                >
                                    <FaTrashAlt />
                                </button>
                            </div>
                        ))}
                        <button 
                            type="button"
                            className="btn--workout-template btn-add--workout-template btn-add--set"
                            onClick={() => addSet(index)}
                        >
                            Dodaj serie +
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