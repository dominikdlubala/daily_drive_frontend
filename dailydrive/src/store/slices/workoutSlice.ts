import { createSlice, PayloadAction } from '@reduxjs/toolkit'; 
import type { WorkoutState, CurrentWorkout } from '../../types'; 

const initialWorkoutState: WorkoutState = {
    currentWorkout: JSON.parse(localStorage.getItem('currentWorkout') || '{"isWorkoutActive": false, "title": "", "exercises": []}'),
}; 

export const workoutSlice = createSlice({
    name: 'workout', 
    initialState: initialWorkoutState, 
    reducers: {
        setWorkout(state, action: PayloadAction<CurrentWorkout>) {
            state.currentWorkout = { ...action.payload, startDate: new Date() }; 
            localStorage.setItem('currentWorkout', JSON.stringify(state.currentWorkout));
        }, 
        updateWorkout(state, action: PayloadAction<Partial<CurrentWorkout>>) {
            state.currentWorkout = { ...state.currentWorkout, ...action.payload, startDate: state.currentWorkout.startDate || new Date() };
            localStorage.setItem('currentWorkout', JSON.stringify(state.currentWorkout));
        }, 
        endWorkout(state, action: PayloadAction<Partial<CurrentWorkout>>) {
            state.currentWorkout = { ...state.currentWorkout, ...action.payload, endDate: new Date() };
            localStorage.setItem('currentWorkout', JSON.stringify(state.currentWorkout));
        },
        resetWorkout(state) {
            state.currentWorkout = { isWorkoutActive: false, title: '', exercises: [] };
            localStorage.removeItem('currentWorkout');
        }
    }
}); 

export const { setWorkout, updateWorkout, endWorkout, resetWorkout } = workoutSlice.actions; 
