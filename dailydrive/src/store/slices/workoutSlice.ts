import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { CurrentWorkout, WorkoutState } from '../../types';
import { startCurrentWorkout as startWorkoutApi, fetchCurrentWorkout as fetchWorkoutApi } from '../../services/WorkoutCurrentService';

const LOCAL_STORAGE_KEY = 'currentWorkout';

const loadWorkoutFromStorage = (): CurrentWorkout | null => {
    const storedWorkout = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!storedWorkout) return null;

    try {
        const parsedWorkout: CurrentWorkout = JSON.parse(storedWorkout);
        return {
            ...parsedWorkout,
            workoutSession: {
                ...parsedWorkout.workoutSession,
                startTime: parsedWorkout.workoutSession.startTime ? new Date(parsedWorkout.workoutSession.startTime) : undefined,
                endTime: parsedWorkout.workoutSession.endTime ? new Date(parsedWorkout.workoutSession.endTime) : null,
            },
        };
    } catch (error) {
        console.error('Error parsing stored workout:', error);
        return null;
    }
};

const saveWorkoutToStorage = (workout: CurrentWorkout | null) => {
    if (workout) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(workout));
    } else {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
};

const initialWorkoutState: WorkoutState = {
    currentWorkout: loadWorkoutFromStorage(),
};

export const fetchCurrentWorkout = createAsyncThunk<CurrentWorkout | null, void>(
    'workout/fetchCurrentWorkout',
    async (_, { rejectWithValue }) => {
        const response = await fetchWorkoutApi();
        if (response.error) {
            return rejectWithValue(response.error.message);
        }
        return response.data || null;
    }
);

export const startCurrentWorkout = createAsyncThunk<CurrentWorkout | null, CurrentWorkout>(
    'workout/startCurrentWorkout',
    async (workout, { rejectWithValue }) => {
        const response = await startWorkoutApi(workout);
        if (response.error) {
            return rejectWithValue(response.error.message);
        }
        return response.data || null;
    }
);

export const workoutSlice = createSlice({
    name: 'workout',
    initialState: initialWorkoutState,
    reducers: {
        setWorkout(state, action: PayloadAction<Partial<CurrentWorkout>>) {
            state.currentWorkout = {
                ...action.payload,
                workoutSession: {
                    ...action.payload.workoutSession,
                    startTime: Date.now()
                },
            };
            saveWorkoutToStorage(state.currentWorkout);
        },
        updateWorkout(state, action: PayloadAction<Partial<CurrentWorkout>>) {
            if (!state.currentWorkout) return;

            state.currentWorkout = {
                id: state.currentWorkout.id,
                workoutSession: {
                    ...state.currentWorkout.workoutSession,
                    ...action.payload.workoutSession,
                },
            };
            saveWorkoutToStorage(state.currentWorkout);
        },
        endWorkout(state) {
            if (!state.currentWorkout) return;

            state.currentWorkout.workoutSession.endTime = Date.now();
            saveWorkoutToStorage(state.currentWorkout);
        },
        resetWorkout(state) {
            state.currentWorkout = null;
            saveWorkoutToStorage(null);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrentWorkout.fulfilled, (state, action) => {
                state.currentWorkout = action.payload;
                saveWorkoutToStorage(state.currentWorkout);
            })
            .addCase(startCurrentWorkout.fulfilled, (state, action) => {
                state.currentWorkout = action.payload;
                saveWorkoutToStorage(state.currentWorkout);
            });
    },
});

export const { setWorkout, updateWorkout, endWorkout, resetWorkout } = workoutSlice.actions;
export default workoutSlice.reducer;

// import { createSlice, PayloadAction } from '@reduxjs/toolkit'; 
// import type { WorkoutState, CurrentWorkout } from '../../types'; 

// const initialWorkoutState: WorkoutState = {
//     currentWorkout: JSON.parse(localStorage.getItem('currentWorkout') || ''),
// }; 

// export const workoutSlice = createSlice({
//     name: 'workout', 
//     initialState: initialWorkoutState, 
//     reducers: {
//         setWorkout(state, action: PayloadAction<CurrentWorkout>) {
//             state.currentWorkout = { ...state.currentWorkout, ...action.payload };
//             localStorage.setItem('currentWorkout', JSON.stringify(state.currentWorkout));
//         }, 
//         updateWorkout(state, action: PayloadAction<CurrentWorkout>) {
//             state.currentWorkout = { ...state.currentWorkout, ...action.payload };
//             localStorage.setItem('currentWorkout', JSON.stringify(state.currentWorkout));
//         }, 
//         endWorkout(state, action: PayloadAction<CurrentWorkout>) {
//             state.currentWorkout = { ...state.currentWorkout, ...action.payload };
//             localStorage.setItem('currentWorkout', JSON.stringify(state.currentWorkout));
//         },
//         resetWorkout(state) {
//             state.currentWorkout = null;
//             localStorage.removeItem('currentWorkout');
//         }
//     }
// }); 

// export const { setWorkout, updateWorkout, endWorkout, resetWorkout } = workoutSlice.actions; 



// import { createSlice, PayloadAction } from '@reduxjs/toolkit'; 
// import type { WorkoutState, CurrentWorkout } from '../../types'; 

// const initialWorkoutState: WorkoutState = {
//     currentWorkout: JSON.parse(localStorage.getItem('currentWorkout') || '{"isWorkoutActive": false, "title": "", "exercises": []}'),
// }; 

// export const workoutSlice = createSlice({
//     name: 'workout', 
//     initialState: initialWorkoutState, 
//     reducers: {
//         setWorkout(state, action: PayloadAction<CurrentWorkout>) {
//             state.currentWorkout = { ...action.payload, startDate: new Date() }; 
//             localStorage.setItem('currentWorkout', JSON.stringify(state.currentWorkout));
//         }, 
//         updateWorkout(state, action: PayloadAction<Partial<CurrentWorkout>>) {
//             state.currentWorkout = { ...state.currentWorkout, ...action.payload, startDate: state.currentWorkout.startDate || new Date() };
//             localStorage.setItem('currentWorkout', JSON.stringify(state.currentWorkout));
//         }, 
//         endWorkout(state, action: PayloadAction<Partial<CurrentWorkout>>) {
//             state.currentWorkout = { ...state.currentWorkout, ...action.payload, endDate: new Date() };
//             localStorage.setItem('currentWorkout', JSON.stringify(state.currentWorkout));
//         },
//         resetWorkout(state) {
//             state.currentWorkout = { isWorkoutActive: false, title: '', exercises: [] };
//             localStorage.removeItem('currentWorkout');
//         }
//     }
// }); 

// export const { setWorkout, updateWorkout, endWorkout, resetWorkout } = workoutSlice.actions; 


