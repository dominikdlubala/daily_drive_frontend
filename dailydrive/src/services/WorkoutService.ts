import { WorkoutTemplate, WorkoutTemplateApiReturn } from "../types";

const API_URL = 'api/WorkoutTemplate'

export const fetchWorkoutTemplates = async (): Promise<WorkoutTemplateApiReturn> => {
    try {
        const response = await fetch(API_URL); 
        if(!response.ok) {
            return { error: { message: await response.text() }}
        }
        const data = await response.json(); 
        return { data }; 
    } catch (err) {
        return { error: { message: 'Unexpected error | fetchWorkoutTemplates'}}
    }
}

export const updateWorkoutTemplate = async (template: WorkoutTemplate): Promise<WorkoutTemplateApiReturn> => {
    try {
        console.log(JSON.stringify(template))

        const response = await fetch(`${API_URL}/${template.id}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json' 
            }, 
            body: JSON.stringify(template)
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

export const addWorkoutTemplate = async (template: Omit<WorkoutTemplate, 'id'>): Promise<WorkoutTemplateApiReturn> => {
    try {
        console.log(JSON.stringify(template))

        const response = await fetch(API_URL, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json' 
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
        return { error: { message: 'Unexpected error | fetchWorkoutTemplates'}}
    }
}