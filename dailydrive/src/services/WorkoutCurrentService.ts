import { CurrentWorkout, CurrentWorkoutApiReturn } from "../types";

const API_URL = 'api/CurrentWorkout'; 

export const startCurrentWorkout = async (workout: CurrentWorkout): Promise<CurrentWorkoutApiReturn> => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(workout)
        })
        if(!response.ok) return { error: { message: await response.text() } }
        const data = await response.json(); 
        return { data }; 
    } catch(err) {
        console.error(err); 
        return { error: { message: 'Unexpected error | startCurrentWorkout' }}
    }
}

export const fetchCurrentWorkout = async (): Promise<CurrentWorkoutApiReturn> => {
    try {
        const response = await fetch(API_URL);
        if(!response.ok) return { error: { message: await response.text() } }
        const data = await response.json(); 
        return { data }; 
    } catch(err) {
        console.error(err); 
        return { error: { message: 'Unexpected error | startCurrentWorkout' }}
    }
}