import { CurrentWorkout } from "../../types";

const LOCAL_STORAGE_KEY = 'currentWorkout';

export const loadWorkoutFromStorage = (): CurrentWorkout | undefined => {
    const storedWorkout = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!storedWorkout) return;

    try {
        const parsedWorkout: CurrentWorkout = JSON.parse(storedWorkout);
        return {
            ...parsedWorkout,
            workoutSession: {
                ...parsedWorkout.workoutSession,
                startTime: parsedWorkout.workoutSession.startTime,
                endTime: parsedWorkout.workoutSession.endTime,
            },
        };
    } catch (error) {
        console.error('Error parsing stored workout:', error);
        return;
    }
};

export const saveWorkoutToStorage = (workout?: CurrentWorkout) => {
    if (workout) {
        const serializedWorkout = {
            ...workout,
            workoutSession: {
                ...workout.workoutSession,
                startTime: workout.workoutSession.startTime ? new Date(workout.workoutSession.startTime).toISOString() : undefined,
                endTime: workout.workoutSession.endTime ? new Date(workout.workoutSession.endTime).toISOString() : null,
            },
        };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(serializedWorkout));
    } else {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
};