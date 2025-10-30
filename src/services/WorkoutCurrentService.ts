import { CurrentWorkout, CurrentWorkoutApiReturn } from "../types";

const API_URL = 'api/CurrentWorkout'; 

export const startCurrentWorkout = async (token: string | null, workout: CurrentWorkout): Promise<CurrentWorkoutApiReturn> => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`
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

export const fetchCurrentWorkout = async (token: string | null): Promise<CurrentWorkoutApiReturn> => {
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if(!response.ok) return { error: { message: await response.text() } }
        const data = await response.json(); 
        return { data }; 
    } catch(err) {
        return { error: { message: 'Unexpected error | startCurrentWorkout' }}
    }
}

export const updateCurrentWorkout = async (token: string | null, workout: CurrentWorkout): Promise<CurrentWorkoutApiReturn> => {
    try {
        const response = await fetch(API_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
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

export const endCurrentWorkout = async (token: string | null, id: number): Promise<CurrentWorkoutApiReturn> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        if(!response.ok) return { error: { message: await response.text() } }
        const data = await response.json();
        return { data }; 
    } catch(err) {
        console.error(err); 
        return { error: { message: 'Unexpected error | startCurrentWorkout' }}
    }
}