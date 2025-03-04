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

export type Exercise = {
    name: string; 
    sets?: ExerciseSet[] | null;
}

export type ExerciseSet = {
    reps: number; 
    weight?: number | null; 
}

export type CurrentWorkout = {
    isWorkoutActive: boolean; 
    title: string; 
    exercises: Exercise[]; 
    startDate?: Date; 
    endDate?: Date; 
}

export type WorkoutState = {
    currentWorkout: CurrentWorkout; 
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