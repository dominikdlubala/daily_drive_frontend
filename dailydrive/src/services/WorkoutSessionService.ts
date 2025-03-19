import { WorkoutSessionApiReturn } from "../types";

const API_URL = 'api/WorkoutSession';

export const fetchWorkoutSessions = async (token: string | null): Promise<WorkoutSessionApiReturn> => {
    try {
        const response = await fetch(API_URL, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if(!response.ok) {
            return { error: { message: await response.text() }}
        }
        const data = await response.json(); 
        return { data };
    } catch(err){
        console.error(err)
        return { error: { message: 'Unexpected error | fetchWorkoutSessions'}}
    }
}

export const deleteWorkoutSession = async (token: string | null, id: number): Promise<WorkoutSessionApiReturn> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, { 
            method: 'DELETE', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            } 
        });
        if(!response.ok) {
            return { error: { message: await response.text() }}
        }
        const data = await response.json(); 
        return { data };
    } catch(err){
        console.error(err)
        return { error: { message: 'Unexpected error | deleteWorkoutSession'}}
    }
}