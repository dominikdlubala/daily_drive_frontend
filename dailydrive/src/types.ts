export type User = {
    id: number; 
    username: string; 
    password: string; 
    firstName?: string | null; 
    lastName?: string | null; 
    registrationDate?: Date; 
}

export type UserApiReturn = {
    data?: User | User[] | null; 
    error?: MyError | null; 
}

export type UserLoginApiReturn = {
    token: string | null; 
    error?: MyError | null; 
}

export type MyError = {
    error?: boolean; 
    message?: string; 
}

export type ExerciseSet = {
    setNumber: number; 
    reps: number; 
    weight: number; 
}

export type WeightExercise = {
    id?: number; 
    name: string; 
    description?: string; 
    type: string; 
    sets: ExerciseSet[];
}

export type CardioExercise = {
    id?: number; 
    name: string; 
    description?: string; 
    type: string; 
    intensity: number; 
    duration: number; 
}

export type WorkoutSession = {
    id?: number; 
    name?: string | null; 
    startTime?: string; 
    endTime?: string | null; 
    weightExercises?: WeightExercise[];
    cardioExercises?: CardioExercise[];
}

export type WorkoutTemplate = {
    id: number; 
    name: string; 
    weightExercises: string[]; 
    cardioExercises: string[]; 
}

export type WorkoutTemplateApiReturn = {
    data?: WorkoutTemplate[] | null; 
    error?: { message: string };
}

export type CurrentWorkout = {
    id?: number; 
    workoutSession: WorkoutSession; 
}

export type CurrentWorkoutApiReturn = {
    data?: CurrentWorkout | null; 
    error?: { message: string } | null; 
}

export type WorkoutState = {
    currentWorkout: CurrentWorkout | null; 
}

export type Exercise = {
    name: string; 
    type: "weight" | "cardio"; 
}

export type ExerciseApiReturn = {
    data?: Exercise[] | null; 
    error?: { message: string } | null; 
}