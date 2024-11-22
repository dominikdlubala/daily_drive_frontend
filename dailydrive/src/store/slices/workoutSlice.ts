import { createSlice, PayloadAction } from '@reduxjs/toolkit'; 

import type { WorkoutState, CurrentWorkout } from '../../types'; 

const initialWorkoutState: WorkoutState = {
    currentWorkout: { isWorkoutActive: false, title: '', exercises: [] } 
}; 

export const workoutSlice = createSlice({
    name: 'workout', 
    initialState: initialWorkoutState, 
    reducers: {
        setWorkout(state, action: PayloadAction<CurrentWorkout>) {
            state.currentWorkout = action.payload; 
        }, 
        updateWorkout(state, action: PayloadAction<Partial<CurrentWorkout>>) {
            state.currentWorkout = { ...state.currentWorkout, ...action.payload }
        }
    }
}); 

export const { setWorkout, updateWorkout } = workoutSlice.actions; 