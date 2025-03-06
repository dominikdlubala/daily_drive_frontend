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

export const fetchExercisesByName = async (type: string, name: string): Promise<ExerciseApiReturn> => {
    try {
        const response = await fetch(`${API_URL}/${type}/${name}`);
        if(!response.ok) {
            return { error: { message: await response.text() }}
        }
        const data = await response.json(); 
        return { data }; 
    } catch (err) {
        return { error: { message: 'Unexpected error | fetchExerciseByName'}}
    }
}

