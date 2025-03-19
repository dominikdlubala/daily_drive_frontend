import { WorkoutTemplate, WorkoutTemplateApiReturn } from "../types";

const API_URL = 'api/WorkoutTemplate'

export const fetchWorkoutTemplates = async (token: string): Promise<WorkoutTemplateApiReturn> => {
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
    } catch (err) {
        return { error: { message: 'Unexpected error | fetchWorkoutTemplates'}}
    }
}

export const addWorkoutTemplate = async (token: string, template: Omit<WorkoutTemplate, 'id'>): Promise<WorkoutTemplateApiReturn> => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }, 
            body: JSON.stringify(template)
        }); 
        if(!response.ok) {
            return { error: { message: await response.text() }}
        }
        const data = await response.json(); 
        return { data }; 
    } catch (err) {
        console.error(err)
        return { error: { message: 'Unexpected error | addWorkoutTemplates'}}
    }
}

export const updateWorkoutTemplate = async (token: string, template: WorkoutTemplate): Promise<WorkoutTemplateApiReturn> => {
    try {

        const response = await fetch(`${API_URL}/${template.id}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`
            }, 
            body: JSON.stringify(template)
        }); 
        if(!response.ok) {
            return { error: { message: await response.text() }}
        }
        const data = await response.json(); 
        return { data }; 
    } catch (err) {
        console.error(err)
        return { error: { message: 'Unexpected error | updateWorkoutTemplates'}}
    }
}

export const deleteWorkoutTemplate = async (token: string, id: number): Promise<WorkoutTemplateApiReturn> => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }); 
        if(!response.ok) return { error: { message: await response.text() }}
        // const data = await response.json(); 
        return { data: null }; 
    } catch(err) {
        console.error(err)
        return { error: { message: 'Unexpected error | deleteWorkoutTemplate '}}
    }
}