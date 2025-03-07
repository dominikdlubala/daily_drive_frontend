import '../styles/workoutForm.css';
import { FormEvent, useState } from 'react'; 
import { FaTrashAlt } from "react-icons/fa";

import type { Exercise, WorkoutTemplate } from '../../types';
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

    const addExercise = () => {
        const newExercise: Exercise = { name: '', type: 'weight' };
        setExercises([...exercises, newExercise]);
    }

    const updateExercise = (index: number, field: string, value: string) => {
        const updatedExercises = [...exercises];
        if (field === 'name') {
            updatedExercises[index].name = value;
        } else if (field === 'type') {
            updatedExercises[index].type = value as 'weight' | 'cardio';
        }
        setExercises(updatedExercises);
    }

    const removeExercise = (index: number) => {
        const updatedExercises = exercises.filter((_, i) => i !== index);
        setExercises(updatedExercises); 
    }

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
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
                    <ExerciseSearch onExerciseSelect={handleExerciseSelect}/>
                    <div className="workout-template--exercises-title">Ćwiczenia</div>
                    {exercises.map((exercise, index) => (
                        <div key={index} className="form-group form-group--workout-template">
                            <input 
                                required
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
                        onClick={addExercise}
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

// import { FormEvent, useState } from 'react'; 
// import { FaTrashAlt } from "react-icons/fa";

// import type { Exercise, WorkoutTemplate } from '../../types';
// import ExerciseSearch from '../exercise/ExerciseSearch';

// export type WorkoutTemplateFormValues = {
//     id?: number;
//     name: string;
//     exercises: Exercise[];
// }

// interface WorkoutTemplateFormProps {
//     initialData?: WorkoutTemplate; 
//     handleSubmit: (formValues: WorkoutTemplateFormValues, add?: boolean) => void; 
// }

// export default function WorkoutTemplateForm({ initialData, handleSubmit }: WorkoutTemplateFormProps) {

//     const [weightExercises, setWeightExercises] = useState<Exercise[]>(initialData?.exercises.filter(e => e.type === 'weight') || []); 
//     const [cardioExercises, setCardioExercises] = useState<Exercise[]>(initialData?.exercises.filter(e => e.type === 'cardio') || []); 
//     const [title, setTitle] = useState<string>(initialData?.name || ''); 

//     const addExercise = (type: 'weight' | 'cardio') => {
//         const newExercise: Exercise = { name: '', type };
//         type === 'weight' 
//         ? setWeightExercises([...weightExercises, newExercise])
//         : setCardioExercises([...cardioExercises, newExercise]);
//     }

//     const updateExercise = (type: string, index: number, value: string) => {
//         if(type === 'weight'){
//             const updatedExercises = [...weightExercises]; 
//             updatedExercises[index] = { ...updatedExercises[index], name: value }; 
//             setWeightExercises(updatedExercises); 
//         } else {
//             const updatedExercises = [...cardioExercises]; 
//             updatedExercises[index] = { ...updatedExercises[index], name: value }; 
//             setCardioExercises(updatedExercises); 
//         }
//     }

//     const removeExercise = (type: string, index: number) => {
//         if(type === 'weight'){
//             const updatedExercises = weightExercises.filter((_, i) => i !== index); 
//             setWeightExercises(updatedExercises); 
//         } else {
//             const updatedExercises = cardioExercises.filter((_, i) => i !== index); 
//             setCardioExercises(updatedExercises);
//         }
//     }

//     const onSubmit = async (e: FormEvent) => {
//         e.preventDefault(); 
//         initialData ? await handleSubmit({
//             ...initialData,
//             name: title, 
//             exercises: [...weightExercises, ...cardioExercises]
//         })
//         : await handleSubmit({
//             name: title, 
//             exercises: [...weightExercises, ...cardioExercises]
//         }, true); 

//     }

//     const handleExerciseSelect = (exercise: Exercise) => {
//         exercise.type === 'weight' 
//         ? setWeightExercises([...weightExercises, exercise])
//         : setCardioExercises([...cardioExercises, exercise])
//     }

//     return (
//         <form 
//             className="form form--workout-template"
//             onSubmit={onSubmit}
//         >
//             <h2 className="form-title">Szablon treningu</h2>
//             <div className="form-group-wrapper">
//                 <div className="form-group form-group--workout-template">
//                     <input 
//                         required
//                         type="text" 
//                         className="form-input form-input--workout-template form-input--workout-template-title"
//                         placeholder="Tytuł treningu"
//                         value={title}
//                         onChange={(e: FormEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)}
//                     />
//                 </div>
//                 <div className="workout-template--exercises">
//                     <ExerciseSearch onExerciseSelect={handleExerciseSelect}/>
//                     <div className="workout-template--exercises-title">Ćwiczenia siłowe</div>
//                     {weightExercises.map((exercise, index) => (
//                         <div
//                             key={index}
//                             className="form-group form-group--workout-template"
//                         >
//                             <input 
//                                 required
//                                 type="text" className="form-input form-input--workout-template" 
//                                 placeholder={`Ćwiczenie nr ${index + 1}`}
//                                 value={exercise.name}
//                                 onChange={(e: React.FormEvent<HTMLInputElement>) => updateExercise('weight', index, e.currentTarget.value)}
//                             />
//                             <button 
//                                 type="button"   
//                                 className="btn btn-remove"
//                                 onClick={() => removeExercise('weight', index)}
//                             >
//                                 <FaTrashAlt />
//                             </button>
//                         </div>
//                     ))}

//                     <button 
//                         type="button"
//                         className="btn--workout-template btn-add--workout-template"
//                         onClick={() => addExercise('weight')}
//                     >
//                         Dodaj ćwiczenie +
//                     </button>
//                 </div>
//                 <div className="workout-template--exercises">
//                     <div className="workout-template--exercises-title">Ćwiczenia cardio</div>
//                     {cardioExercises.map((exercise, index) => (
//                         <div
//                             key={index}
//                             className="form-group form-group--workout-template"
//                         >
//                             <input 
//                                 required
//                                 type="text" className="form-input form-input--workout-template" 
//                                 placeholder={`Ćwiczenie nr ${index + 1}`}
//                                 value={exercise.name}
//                                 onChange={(e: React.FormEvent<HTMLInputElement>) => updateExercise('cardio', index, e.currentTarget.value)}
//                             />
//                             <button 
//                                 type="button"   
//                                 className="btn btn-remove"
//                                 onClick={() => removeExercise('cardio', index)}
//                             >
//                                 <FaTrashAlt />
//                             </button>
//                         </div>
//                     ))}

//                     <button 
//                         type="button"
//                         className="btn--workout-template btn-add--workout-template"
//                         onClick={() => addExercise('cardio')}
//                     >
//                         Dodaj ćwiczenie +
//                     </button>
//                 </div>
//             </div>

//             <button 
//                 type="submit"
//                 className="btn-submit btn-submit--workout-template"
//             >
//                 Zapisz
//             </button>
//         </form>
//     )
// }