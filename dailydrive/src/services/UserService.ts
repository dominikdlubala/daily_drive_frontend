import { RegisterFormValues } from '../components/login/RegisterForm';
import type { UserLoginApiReturn } from '../types'; 

const API_URL = '/api/User'; 

export const loginUser = async (username: string, password: string): Promise<UserLoginApiReturn> => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username, 
                password: password 
            })
        });

        if(!response.ok) {
            return { token: null, error: { error: true, message: await response.text() } }
        }

        const data = await response.json() as { token: string }; 

        return { token: data.token };  
    } catch (error) {
        return { token: null, error: { error: true, message: 'Niespodziewany błąd' } }
    }
}

export const registerUser = async (formValues: RegisterFormValues): Promise<UserLoginApiReturn> => {
    try {

        const response = await fetch(`${API_URL}/register`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
            }, 
            body: JSON.stringify(formValues)
        }); 

        if (!response.ok) {
            const errorText = await response.text(); 
            return { token: null, error: { error: true, message: errorText } }
        }

        return { token: null }
    } catch (error) {
        return { token: null, error: { error: true, message: 'Unexpected error / registerUser' } };
    }
}

export const getUserData = async (token: string | null) => {
    try {
        const response = await fetch(`${API_URL}`, {
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
        console.error(err); 
        return { error: { message: 'Unexpected error | fetchProductByName' }}
    }
}
