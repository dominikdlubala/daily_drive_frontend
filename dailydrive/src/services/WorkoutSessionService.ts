import { WorkoutSessionApiReturn } from "../types";

const API_URL = 'api/WorkoutSession';

export const fetchWorkoutSessions = async (): Promise<WorkoutSessionApiReturn> => {
    try {
        const response = await fetch(API_URL);
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

export const deleteWorkoutSession = async (id: number): Promise<WorkoutSessionApiReturn> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
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