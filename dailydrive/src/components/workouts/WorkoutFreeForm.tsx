import { useState, useEffect, FormEvent } from "react";
import { FaTrashAlt } from "react-icons/fa";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { setWorkout, updateWorkout, endWorkout, resetWorkout } from "../../store";

import type { CurrentWorkout, WeightExercise, CardioExercise } from "../../types";

interface WorkoutFreeFormProps {
  handleModalClose?: (updatedWorkout?: CurrentWorkout) => void;
}

export default function WorkoutFreeForm({ handleModalClose }: WorkoutFreeFormProps) {
  const dispatch = useAppDispatch();
  const currentWorkout = useAppSelector((state) => state.workout.currentWorkout);

  const [title, setTitle] = useState(currentWorkout?.workoutSession.name || "");
  const [weightExercises, setWeightExercises] = useState<WeightExercise[]>(currentWorkout?.workoutSession.weightExercises || []);
  const [cardioExercises, setCardioExercises] = useState<CardioExercise[]>(currentWorkout?.workoutSession.cardioExercises || []);

  useEffect(() => {
    if (currentWorkout) {
      setTitle(currentWorkout.workoutSession.name || "");
      setWeightExercises(currentWorkout.workoutSession.weightExercises || []);
      setCardioExercises(currentWorkout.workoutSession.cardioExercises || []);
    }
  }, [currentWorkout]);

  const syncWorkout = () => {
    if (currentWorkout) {
      dispatch(updateWorkout({
        ...currentWorkout,
        workoutSession: {
          ...currentWorkout.workoutSession,
          name: title,
          weightExercises,
          cardioExercises,
        }
      }));
    } else {
        dispatch(setWorkout({
            workoutSession: {
                name: title, 
                weightExercises, 
                cardioExercises,
                startTime: undefined
            }
        }))
    }
  };

  const addExercise = (type: "weight" | "cardio") => {
    if (type === "weight") {
      setWeightExercises([...weightExercises, { name: "", type: type, sets: [] }]);
    } else {
      setCardioExercises([...cardioExercises, { name: "", type:type, intensity: 0, duration: 0 }]);
    }
  };

  const updateExercise = (type: "weight" | "cardio", index: number, value: string) => {
    if (type === "weight") {
      const updated = [...weightExercises];
      updated[index].name = value;
      setWeightExercises(updated);
    } else {
      const updated = [...cardioExercises];
      updated[index].name = value;
      setCardioExercises(updated);
    }
  };

  const removeExercise = (type: "weight" | "cardio", index: number) => {
    if (type === "weight") {
      setWeightExercises(weightExercises.filter((_, i) => i !== index));
    } else {
      setCardioExercises(cardioExercises.filter((_, i) => i !== index));
    }
  };

  const handleWorkoutEnd = () => {
    if (currentWorkout) {
        dispatch(updateWorkout({ ...currentWorkout, workoutSession: { ...currentWorkout.workoutSession, endTime: Date.now() } }));
        dispatch(endWorkout()); 
        dispatch(resetWorkout());
        handleModalClose && handleModalClose();
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    syncWorkout();
    console.log(currentWorkout);
    handleModalClose && handleModalClose();
  };

  return (
    <form onSubmit={handleSubmit} className="form form--workout-free">
      <h2 className="form-title">Trening wolny</h2>
      <input
        required
        type="text"
        className="form-input form-input--workout-free-title"
        placeholder="Tytuł treningu"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="workout-section">
        <h3>Ćwiczenia siłowe</h3>
        {weightExercises.map((exercise, index) => (
        // fix key
          <div key={index} className="exercise-group">
            <input
              required
              type="text"
              className="form-input"
              placeholder={`Ćwiczenie ${index + 1}`}
              value={exercise.name}
              onChange={(e) => updateExercise("weight", index, e.target.value)}
            />
            <button type="button" onClick={() => removeExercise("weight", index)}>
              <FaTrashAlt />
            </button>
          </div>
        ))}
        <button type="button" onClick={() => addExercise("weight")}>Dodaj ćwiczenie +</button>
      </div>

      <div className="workout-section">
        <h3>Ćwiczenia cardio</h3>
        {cardioExercises.map((exercise, index) => (
        // fix key
          <div key={index} className="exercise-group">
            <input
              required
              type="text"
              className="form-input"
              placeholder={`Ćwiczenie ${index + 1}`}
              value={exercise.name}
              onChange={(e) => updateExercise("cardio", index, e.target.value)}
            />
            <button type="button" onClick={() => removeExercise("cardio", index)}>
              <FaTrashAlt />
            </button>
          </div>
        ))}
        <button type="button" onClick={() => addExercise("cardio")}>Dodaj ćwiczenie +</button>
      </div>

      <div className="workout-actions">
        <button type="submit">Zapisz trening</button>
        {currentWorkout && <button type="button" onClick={handleWorkoutEnd}>Zakończ trening</button>}
      </div>
    </form>
  );
}

// import { useState, useEffect } from 'react'; 
// import { FaTrashAlt } from "react-icons/fa";

// import { useAppDispatch } from '../../hooks/useAppDispatch';
// import { useAppSelector } from '../../hooks/useAppSelector';
// import { updateWorkout, endWorkout, resetWorkout } from '../../store';

// import type { CurrentWorkout, Exercise, ExerciseSet } from '../../types';

// interface WorkoutFreeFormProps {
//     handleModalClose?: (updatedWorkout?: CurrentWorkout) => void; 
// }

// // do zrobienia: 
// // przenieść funkcje dodajace cwiczenia, serie do osobnego pliku. 

// export default function WorkoutFreeForm({ handleModalClose }: WorkoutFreeFormProps) {

//     const dispatch = useAppDispatch(); 
//     const currentWorkout = useAppSelector((state) => state.workout.currentWorkout); 

//     const [exercises, setExercises] = useState(currentWorkout.exercises || []); 
//     const [title, setTitle] = useState<string>(currentWorkout.title || ''); 

//     useEffect(() => {
//         setExercises(currentWorkout.exercises); 
//         setTitle(currentWorkout.title); 
//     }, [currentWorkout]); 

//     const syncWorkout = (updatedWorkout: { isWorkoutActive?: boolean, title?: string, exercises?: Exercise[] }) => {
//         dispatch(updateWorkout(updatedWorkout)); 
//     }

//     const addExercise = () => {
//         setExercises([...exercises, { name: "", sets: [] }]); 
//     }

//     const updateExercise = (index: number, value: string) => {
//         const updatedExercises = [...exercises]; 
//         updatedExercises[index].name = value; 
//         setExercises(updatedExercises); 
//     }

//     const removeExercise = (index: number) => {
//         const updatedExercises = exercises.filter((_, i) => i !== index); 
//         setExercises(updatedExercises); 
//     }

//     const addSet = (exerciseIndex: number) => {
//         const updatedExercises = exercises.map((exercise, index) => {
//             if (index === exerciseIndex) {
//                 const newSets = [...(exercise.sets || []), { reps: 0, weight: 0 }];
//                 return { ...exercise, sets: newSets };
//             }
//             return exercise;
//         });
    
//         setExercises(updatedExercises);
//     };

//     const updateSet = (exerciseIndex: number, setIndex: number, field: 'reps' | 'weight', value: number) => {
//         const updatedExercises = [...exercises]; 
//         if(!updatedExercises[exerciseIndex].sets){
//             updatedExercises[exerciseIndex].sets = [] as ExerciseSet[]; 
//         }
//         updatedExercises[exerciseIndex].sets![setIndex][field] = value; 
//         setExercises(updatedExercises); 
//     }

//     const removeSet = (exerciseIndex: number, setIndex: number) => {
//         const updatedExercises = [...exercises]; 
//         updatedExercises[exerciseIndex].sets = updatedExercises[exerciseIndex].sets?.filter((_, index) => index !== setIndex); 
//         setExercises(updatedExercises); 
//     }

//     const handleWorkoutEnd = () => {
//         dispatch(endWorkout({ isWorkoutActive: false, title, exercises })); 
//         dispatch(resetWorkout()); 
//         handleModalClose && handleModalClose(); 
//     }

//     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault(); 
//         syncWorkout({ isWorkoutActive: true, title, exercises }); 
//         handleModalClose && handleModalClose(); 
//     }

//     return (
//         <form 
//             onSubmit={handleSubmit}
//             className="form form--workout-free"
//         >
//             <h2 className="form-title">Trening wolny</h2>
//             <div className="form-group-wrapper">
//                 <div className="form-group form-group--workout-free">
//                     <input 
//                         required
//                         type="text" 
//                         className="form-input form-input--workout-free form-input--workout-free-title"
//                         placeholder="Tytuł treningu"
//                         value={title}
//                         onChange={(e: React.FormEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)}
//                     />
//                 </div>
//                 {exercises.map((exercise, index) => (
//                     <div
//                         key={index}
//                         className="form-group form-group--workout-free"
//                     >
//                         <div className="form-subgroup">
//                             <input 
//                                 required
//                                 type="text" className="form-input form-input--workout-free" 
//                                 placeholder={`Ćwiczenie nr ${index + 1}`}
//                                 value={exercise.name}
//                                 onChange={(e: React.FormEvent<HTMLInputElement>) => updateExercise(index, e.currentTarget.value)}
//                             />
//                             <button 
//                                 type="button"   
//                                 className="btn btn-remove"
//                                 onClick={() => removeExercise(index)}
//                             >
//                                 <FaTrashAlt />
//                             </button>
//                         </div>
//                         {exercise.sets?.map((set, setIndex) => (
//                             <div key={setIndex} className="form-subgroup form-subgroup--set">
//                                 <label className="form-input--label">Seria {setIndex + 1}</label>
//                                 <input 
//                                     required
//                                     type="text" className="form-input form-input--workout-free form-input--set" 
//                                     placeholder={`Powt.`}
//                                     value={set.reps}
//                                     onChange={(e: React.FormEvent<HTMLInputElement>) => updateSet(index, setIndex, 'reps', parseInt(e.currentTarget.value))}
//                                 />
//                                 <input 
//                                     required
//                                     type="text" className="form-input form-input--workout-free form-input--set" 
//                                     placeholder={`Kg`}
//                                     value={set.weight || ''}
//                                     onChange={(e: React.FormEvent<HTMLInputElement>) => updateSet(index, setIndex, 'weight', parseInt(e.currentTarget.value))}
//                                 />
//                                 <button 
//                                     type="button"   
//                                     className="btn btn-remove"
//                                     onClick={() => removeSet(index, setIndex)}
//                                 >
//                                     <FaTrashAlt />
//                                 </button>
//                             </div>
//                         ))}
//                         <button 
//                             type="button"
//                             className="btn--workout-template btn-add--workout-template btn-add--set"
//                             onClick={() => addSet(index)}
//                         >
//                             Dodaj serie +
//                         </button>
//                     </div>
//                 ))}

//                 <button 
//                     type="button"
//                     className="btn--workout-template btn-add--workout-template"
//                     onClick={() => addExercise()}
//                 >
//                     Dodaj ćwiczenie +
//                 </button>
//             </div>


            

//             {
//                 currentWorkout.isWorkoutActive
//                 ?
//                 <div className="buttons--workout-active">
//                     <button 
//                         className="btn-submit btn-submit--workout-template"
//                     >
//                         Zaktualizuj trening
//                     </button>
//                     <button
//                         onClick={handleWorkoutEnd}
//                         className="btn-submit btn-end--workout"
//                     >
//                         Zakończ trening
//                     </button>
//                 </div>
//                 :
//                 <button 
//                     type="submit"
//                     className="btn-submit btn-submit--workout-template"
//                 >
//                     Rozpocznij trening
//                 </button>
//             }
//         </form>
//     )
// }