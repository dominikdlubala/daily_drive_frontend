import { configureStore } from '@reduxjs/toolkit'; 
import { workoutSlice } from './slices/current_workout/slice';
import { exerciseSlice } from './slices/exercise/slice';
import modalSliceReducer from './slices/modal/slice'; 

const store = configureStore({
    reducer: {
        workout: workoutSlice.reducer,
        exercise: exerciseSlice.reducer, 
        modal: modalSliceReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>; 
export type AppDispatch = typeof store.dispatch; 

export default store; 
export * from './slices/current_workout/slice'; 
export * from './slices/current_workout/thunk'; 
export * from './slices/modal/slice'; 