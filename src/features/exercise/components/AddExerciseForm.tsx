import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { useAuth } from "../../../hooks/useAuth";
import { addExerciseToWorkout, closeModalByType, ModalTypes, updateCurrentWorkout, updateWorkout } from "../../../store";
import { closeExerciseModal } from "../../../store/slices/exercise/slice";
import { CardioExercise, Exercise, ExerciseDefinition, WeightExercise } from "../../../types";
import ExerciseSearch from "./ExerciseSearch";

export default function AddExerciseForm() {
  const dispatch = useAppDispatch();
  const { currentWorkout } = useAppSelector(state => state.workout); 


  // const onSelect = (exercise: ExerciseDefinition) => {
  //   dispatch(addExerciseToWorkout(exercise)); 
  //   dispatch(closeModalByType(ModalTypes.ADD_EXERCISE)); 
  // }

  return (
    <div className="add-exercise-form">
      {/* <ExerciseSearch onExerciseSelect={onSelect} /> */}
    </div>
  )
}