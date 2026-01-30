import { createAsyncThunk } from "@reduxjs/toolkit";
import { CurrentWorkout } from "../../../types";
import { startCurrentWorkout as startWorkoutApi, fetchCurrentWorkout as fetchWorkoutApi, updateCurrentWorkout as updateWorkoutApi, endCurrentWorkout as endWorkoutApi } from '../../../services/WorkoutCurrentService';

export const fetchCurrentWorkout = createAsyncThunk<CurrentWorkout | null, { token: string | null }>(
    'workout/fetchCurrentWorkout',
    async ({ token }, { rejectWithValue }) => {
        const response = await fetchWorkoutApi(token);
        if (response.error) {
            return rejectWithValue(response.error.message);
        }
        return response.data || null;
    }
);

export const startCurrentWorkout = createAsyncThunk<CurrentWorkout | undefined, { workout: CurrentWorkout, token: string | null }>(
    'workout/startCurrentWorkout',
    async ({ token, workout }, { rejectWithValue }) => {
        const response = await startWorkoutApi(token, workout);
        if (response.error) {
            return rejectWithValue(response.error.message);
        }
        return response.data || undefined;
    }
);

export const updateCurrentWorkout = createAsyncThunk<CurrentWorkout | null, { workout: CurrentWorkout, token: string | null }>(
    'workout/updateCurrentWorkout',
    async ({ token, workout }, { rejectWithValue }) => {
        const response = await updateWorkoutApi(token, workout);
        if(response.error) {
            return rejectWithValue(response.error.message);
        }
        return response.data || null; 
    }
);

export const endCurrentWorkout = createAsyncThunk<CurrentWorkout | null, { id: number, token: string | null }>(
    'workout/endCurrentWorkout',
    async ({ token, id }, { rejectWithValue }) => {
        const response = await endWorkoutApi(token, id); 
        if(response.error) {
            return rejectWithValue(response.error.message);
        }
        return response.data || null;
    }
)