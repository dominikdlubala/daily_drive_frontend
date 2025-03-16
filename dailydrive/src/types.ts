export type User = {
    id: number; 
    username: string; 
    password: string; 
    firstName?: string | null; 
    lastName?: string | null; 
    registrationDate?: Date; 
}

export type UserGoal = {
    id?: number; 
    goalCalories: number;
    goalProtein: number;
    goalCarbs: number;
    goalFat: number;
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
    bodyPart: 'chest' | 'back' | 'shoulders' | 'legs' | 'arms' | 'other';
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

export type WorkoutSessionApiReturn = {
    data?: WorkoutSession[] | null; 
    error?: MyError | null; 
}

export type WorkoutTemplate = {
    id: number; 
    name: string; 
    exercises: Exercise[]
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
    id?: number;
    name: string; 
    type: "weight" | "cardio"; 
    bodyPart: 'chest' | 'back' | 'shoulders' | 'legs' | 'arms' | 'cardio' | 'other';
}

export type ExerciseApiReturn = {
    data?: Exercise[] | null; 
    error?: { message: string } | null; 
}



// Diet Types
export type Product = {
    id?: number;
    name: string; 
    weight: number; 
    caloriesPer100g: number; 
    proteinPer100g: number;
    carbsPer100g: number;
    fatPer100g: number;
}

export type Meal = {
    id?: number; 
    name: string; 
    totalCalories: number;
    totalProtein: number;
    totalCarbs: number;
    totalFat: number;
    dailyDietId?: number;
    date?: Date; 
    products: Product[]
}

export type DailyDiet = {
    id?: number; 
    date: Date; 
    totalCalories: number;
    totalProtein: number;
    totalCarbs: number;
    totalFat: number;
    meals: Meal[];
}

