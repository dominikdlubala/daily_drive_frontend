import { Meal } from "../types";

const API_URL = 'api/DailyDiet'; 
const API_URL_MEAL = 'api/Meal';
const API_URL_PROD = 'api/Product';

export const fetchDietByDate = async (token: string | null, date: Date) => {
    try {
        const response = await fetch(`${API_URL}/${date.toISOString()}`, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        if(!response.ok) return { error: { message: await response.text() } }
        const data = await response.json(); 
        return { data }; 
    } catch(err) {
        return { error: { message: 'Unexpected error | fetchDietByDate' }}
    }
}

export const fetchProductByName = async (name: string) => {
    try {
        const response = await fetch(`${API_URL_PROD}/${name}`)
        if(!response.ok) return { error: { message: await response.text() } }
        const data = await response.json(); 
        return { data }; 
    } catch(err) {
        console.error(err); 
        return { error: { message: 'Unexpected error | fetchProductByName' }}
    }
}

export const addMeal = async (token: string | null, meal: Meal) => {
    try {
        const response = await fetch(`${API_URL_MEAL}`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(meal)
        })
        if(!response.ok) {
            return { error: { message: await response.text() } }
        }
        const data = await response.json(); 
        return { data }; 
    } catch(err) {
        return { error: { message: 'Unexpected error | updateMeal' }}
    }
}

export const updateMeal = async (token: string | null, meal: Meal) => {
    try {
        const response = await fetch(`${API_URL_MEAL}/${meal.id}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(meal)
        })
        if(!response.ok) {
            return { error: { message: await response.text() } }
        }
        const data = await response.json(); 
        return { data }; 
    } catch(err) {
        return { error: { message: 'Unexpected error | updateMeal' }}
    }
}

export const deleteMeal = async (token: string | null, id: number) => {
    try {
        const response = await fetch(`${API_URL_MEAL}/${id}`, {
            method: 'DELETE', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        if(!response.ok) {
            return { error: { message: await response.text() } }
        }
        const data = await response.json(); 
        return { data }; 
    } catch(err) {
        return { error: { message: 'Unexpected error | updateMeal' }}
    }
}