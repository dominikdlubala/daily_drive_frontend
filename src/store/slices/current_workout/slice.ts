import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardioExercise, CurrentWorkout, Exercise, WeightExercise, WorkoutSession, WorkoutState } from '../../../types';
import { fetchCurrentWorkout, startCurrentWorkout } from './thunk';
import { loadWorkoutFromStorage, saveWorkoutToStorage } from '../../../utils/current_workout/storage_manager';
import { exerciseToCardioExercise, exerciseToWeightExercise } from '../../../utils/current_workout/exercise_converter';

const initialWorkoutState: WorkoutState = {
    currentWorkout: loadWorkoutFromStorage(),
};

export const workoutSlice = createSlice({
    name: 'workout',
    initialState: initialWorkoutState,
    reducers: {
        initiateWorkout(state) {
            state.currentWorkout = {
                workoutSession: { 
                    weightExercises: [], 
                    cardioExercises: [],
                    startTime: new Date().toISOString(), 
                    endTime: new Date().toISOString()
                },
            };
            saveWorkoutToStorage(state.currentWorkout);
        },
        setWorkout(state, action: PayloadAction<CurrentWorkout>) {
            state.currentWorkout = {
                ...action.payload,
                workoutSession: {
                    ...action.payload.workoutSession,
                    startTime: new Date().toISOString(), 
                    endTime: new Date().toISOString()
                },
            };
            saveWorkoutToStorage(state.currentWorkout);
        },
        updateWorkout(state, action: PayloadAction<Partial<WorkoutSession>>) {
            if (!state.currentWorkout) return;

            state.currentWorkout = {
                id: state.currentWorkout.id,
                workoutSession: {
                    ...state.currentWorkout.workoutSession,
                    ...action.payload,
                },
            };
            saveWorkoutToStorage(state.currentWorkout);
        },
        endWorkout(state) {
            if (!state.currentWorkout) return;

            state.currentWorkout.workoutSession.endTime = new Date().toISOString();
            saveWorkoutToStorage(state.currentWorkout);
        },
        resetWorkout(state) {
            state.currentWorkout = undefined;
            saveWorkoutToStorage(undefined);
        },
        addExerciseToWorkout(state, action: PayloadAction<Exercise>) {
            if (!state.currentWorkout) return;

            const weightExs = state.currentWorkout.workoutSession.weightExercises; 
            const cardioExs = state.currentWorkout.workoutSession.cardioExercises; 
            switch(action.payload.type) {
                case 'Weight': 
                    state.currentWorkout.workoutSession.weightExercises = [...weightExs, exerciseToWeightExercise(action.payload)]
                    break;
                case 'Cardio':
                    state.currentWorkout.workoutSession.cardioExercises = [...cardioExs, exerciseToCardioExercise(action.payload)]
                    break; 
            }
            saveWorkoutToStorage(state.currentWorkout); 
        }, 
        updateExerciseDetails(state, action: PayloadAction<WeightExercise | CardioExercise>) {
            console.log(action.payload); 
        }, 
        removeExercise(state, action: PayloadAction<{ index: number, exercise: WeightExercise | CardioExercise}>) {
            if(!state.currentWorkout) return; 

            const index = action.payload.index; 
            const exercise = action.payload.exercise; 
            console.log(index, exercise); 
            switch(exercise.type) {
                case 'Weight':
                    state.currentWorkout.workoutSession.weightExercises.filter((ex, idx) => idx !== index); 
                    break;
                case 'Cardio':
                    state.currentWorkout.workoutSession.cardioExercises.filter((ex, idx) => idx !== index)
                    break; 
            }
            console.log('after')
            saveWorkoutToStorage(state.currentWorkout); 
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrentWorkout.fulfilled, (state, action) => {
                if(action.payload?.id){
                    state.currentWorkout = action.payload;
                    saveWorkoutToStorage(state.currentWorkout);
                }
            })
            .addCase(startCurrentWorkout.fulfilled, (state, action) => {
                state.currentWorkout = action.payload;
                saveWorkoutToStorage(state.currentWorkout);
            })
    },
});

export const { 
    initiateWorkout,
    setWorkout,
    updateWorkout,
    endWorkout,
    resetWorkout,
    addExerciseToWorkout, 
    updateExerciseDetails,
    removeExercise
} = workoutSlice.actions;
export default workoutSlice.reducer;


