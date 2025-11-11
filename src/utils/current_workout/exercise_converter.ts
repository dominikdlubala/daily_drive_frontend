import { CardioExercise, Exercise, WeightExercise } from "../../types";

export const exerciseToWeightExercise = (exercise: Exercise) => {
  return { 
    ...exercise, 
    sets: []
  } as WeightExercise
}

export const exerciseToCardioExercise = (exercise: Exercise) => {
  return { 
    ...exercise, 
    intensity: 0, 
    duration: 0 
  } as CardioExercise;
}

