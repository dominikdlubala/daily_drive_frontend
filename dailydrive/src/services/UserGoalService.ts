import { UserGoalFormValues } from "../components/account/EditUserGoalForm";

const API_URL = 'api/UserGoal';

export const getUserGoals = async (token: string | null, date?: string) => {
    try {
        const response = await fetch(`${API_URL}/${date}`, {
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
        console.error(err); 
        return { error: { message: 'Unexpected error | getUserGoals' }}
    }
}

export const updateUserGoal = async (token: string | null, userGoal: UserGoalFormValues, goalId: number) => {
    try {
        const response = await fetch(`${API_URL}/${goalId}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }, 
            body: JSON.stringify(userGoal)
        })
        if(!response.ok) return { error: { message: await response.text() } }
        const data = await response.json(); 
        return { data }; 
    } catch(err) {
        console.error(err); 
        return { error: { message: 'Unexpected error | updateUserGoal' }}
    }
}