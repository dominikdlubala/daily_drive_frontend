import { Meal } from "../types";

const API_URL = 'api/DailyDiet'; 
const API_URL_MEAL = 'api/Meal';
const API_URL_PROD = 'api/Product';

export const fetchDietByDate = async (date: Date) => {
    try {
        const response = await fetch(`${API_URL}/${date.toISOString()}`)
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

export const updateMeal = async (meal: Meal) => {
    try {
        const response = await fetch(`${API_URL_MEAL}/${meal.id}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(meal)
        })
        if(!response.ok) {
            return { error: { message: await response.text() } }
        }
        const data = await response.json(); 
        return { data }; 
    } catch(err) {
        // console.error(err); 
        return { error: { message: 'Unexpected error | updateMeal' }}
    }
}