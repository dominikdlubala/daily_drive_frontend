import { ExerciseApiReturn } from "../types";

const API_URL = 'api/Exercise';

export const fetchExercises = async (): Promise<ExerciseApiReturn> => {
    try {
        const response = await fetch(API_URL);
        if(!response.ok) {
            return { error: { message: await response.text() }}
        }
        const data = await response.json(); 
        return { data }; 
    } catch (err) {
        return { error: { message: 'Unexpected error | fetchExercises'}}
    }
}

export const fetchExercisesByName = async (name: string, type?: string): Promise<ExerciseApiReturn> => {
    try {
        let response; 
        if(!type) {
            response = await fetch(`${API_URL}/${name}`); 
        } else {
            response = await fetch(`${API_URL}/${name}/${type}`);
        }
        if(!response.ok) {
            return { error: { message: await response.text() }}
        }
        const data = await response.json(); 
        return { data }; 
    } catch (err) {
        return { error: { message: 'Unexpected error | fetchExerciseByName'}}
    }
}

