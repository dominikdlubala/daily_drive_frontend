import { configureStore } from '@reduxjs/toolkit'; 
import { workoutSlice } from './slices/current_workout/slice';
import { exerciseSlice } from './slices/exercise/slice';
import modalSliceReducer from './slices/modal/slice'; 
import { homePageApi } from 'src/api/queries/homePageApi';
import { exerciseApi } from 'src/api/queries/exerciseApi';
import { toastMiddleware } from './middleware/middleware';
import { workoutApi } from 'src/api/queries/workoutApi';

const store = configureStore({
    reducer: {
        workout: workoutSlice.reducer,
        modal: modalSliceReducer,
        [homePageApi.reducerPath]: homePageApi.reducer, 
        [exerciseApi.reducerPath]: exerciseApi.reducer,
        [workoutApi.reducerPath]: workoutApi.reducer
    }, 
    middleware: 
        (getDefaultMiddleware) => 
            getDefaultMiddleware()
                .concat(homePageApi.middleware)
                .concat(exerciseApi.middleware)
                .concat(workoutApi.middleware)
                .concat(toastMiddleware)
})

export type RootState = ReturnType<typeof store.getState>; 
export type AppDispatch = typeof store.dispatch; 

export default store; 
export * from './slices/current_workout/slice'; 
export * from './slices/current_workout/thunk'; 
export * from './slices/modal/slice'; 