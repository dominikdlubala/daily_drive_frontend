import { configureStore } from '@reduxjs/toolkit'; 

import { workoutSlice } from './slices/workoutSlice';

const store = configureStore({
    reducer: {
        workout: workoutSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>; 
export type AppDispatch = typeof store.dispatch; 

export default store; 
export * from './slices/workoutSlice'; 