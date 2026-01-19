
export interface ApiResponse<T = any> {
  status: number; 
  message: string; 
  data?: T; 
  showNotification?: boolean; 
  autoHide?: boolean; 
}

export type User = {
    id: number; 
    username: string; 
    // password: string; 
    firstName?: string | null; 
    lastName?: string | null; 
    email?: string; 
    height: number; 
    weight: number;
    gender: Gender;
    age: number; 
    activityLevel: ActivityLevel;
    registrationDate?: Date; 
    userGoal?: UserGoal; 
}

export type Gender = 'Male' | 'Female' | 'Other';
export type ActivityLevel = 'LowActivity' | 'MediumActivity' | 'HighActivity' | 'Adaptive';
export type WeightGoal = 'WeightLoss' | 'WeightGain' | 'WeightMaintenance';

export type UserGoal = {
    id?: number; 
    weightGoal: WeightGoal;
    goalCalories: number;
    goalProtein: number;
    goalCarbs: number;
    goalFat: number;

    additionalCalories?: number;
    additionalProtein?: number;
    additionalCarbs?: number;
    additionalFat?: number;
}

export type RegisterDTO = {
    user: User; 
    userGoal: UserGoal; 
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
    bodyPart: BodyPart;
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
    weightExercises: WeightExercise[];
    cardioExercises: CardioExercise[];

    bodyPart?: BodyPart; 
    weightLifted?: number; 
    MET?: number; 
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
    currentWorkout?: CurrentWorkout; 
}

export type Exercise = {
    id?: number;
    name: string; 
    type: "Weight" | "Cardio"; 
    bodyPart: BodyPart;
}

export type ExerciseApiReturn = {
    data?: Exercise[] | null; 
    error?: { message: string, status?: number | string } | null; 
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


// Home Page
export type HomePageData = {
    weightLifted: number;
    timeSpent: number;
    workoutSessions: HomePageWorkoutSessionDTO[];
    mostTrained: BodyPart[];
    recommendedBodyPart: BodyPart;
    averageCalories: number;
    averageProtein: number;
    averageCarbs: number;
    averageFat: number;
    userGoal: UserGoal;
    dailyDiets: HomePageDailyDietDTO[];
    hardestToReachGoal: string;
    goalDifference: number;
    dailyDietToday?: DailyDiet;
    lastWorkoutSessions: WorkoutSession[];
}

export type HomePageWorkoutSessionDTO = {
    name?: string;
    timeSpent: number;
    weightLifted: number;
    date: Date;
}

export type HomePageDailyDietDTO = {
    totalCalories: number;
    date: Date;
}

export const BODY_PARTS_LIST = ['Chest', 'Back', 'Shoulders', 'Legs', 'Arms', 'Other'] as const;

// export type BodyPart = typeof BODY_PARTS_LIST[number]; 

export type BodyPart = {
    id?: number; 
    name: string; 
}

// Statistics
export type WorkoutStatistic = {
    name: string; 
    firstDate: string; 
    lastDate: string; 
    highest1RM: number; 
    lowest1RM: number;
    percentageChange: number; 
    weightExerciseStats: WeightExerciseStat[];
}

export type WeightExerciseStat = {
    name: string; 
    date: string; 
    potential1RM: number;
}


// Exercise
export interface ExerciseDefinition {
    id: string; 
    name: string; 
    unit: string; 
    bodyParts?: BodyPart[]; 
    workoutTemplates?: WorkoutTemplate[]
}

export interface CreateExerciseDefinitionDTO {
    name: string; 
    unit: string; 
    bodyParts?: BodyPart[]; 
}