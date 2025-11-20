import { UserDataFormValues } from 'src/features/account/components/EditUserDataForm';
import { RegisterFormValues } from '../features/login/components/RegisterForm';
import type { UserLoginApiReturn } from '../types'; 
import { ChangePasswordFormValues } from 'src/features/account/components/ChangePasswordForm';
import client from 'src/api/axios/client';

const API_ROUTE = `${process.env.REACT_APP_API_URL || 'http://localhost:4000'}/auth`; 

export const loginUser = async (username: string, password: string): Promise<UserLoginApiReturn> => {
    try {
        const response = await client.post(`${API_ROUTE}/login`, {
            username, 
            password
        });

        return { token: response.data.data.accessToken };  
    } catch (error) {
        return { token: null, error: { error: true, message: 'Niespodziewany błąd' } }
    }
}

export const registerUser = async (formValues: RegisterFormValues): Promise<UserLoginApiReturn> => {
    try {

        const response = await fetch(`${API_ROUTE}/register`, {
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
        const response = await fetch(`${API_ROUTE}`, {
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


export const updateUserData = async (token: string | null, userData: UserDataFormValues) => {
    try {
        const response = await fetch(`${API_ROUTE}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }, 
            body: JSON.stringify(userData)
        });
        if(!response.ok) {
            return { error: { message: await response.text() } }
        }
        const data = await response.json();
        return { data };
    } catch(err) {
        console.error(err); 
        return { error: { message: 'Unexpected error | fetchProductByName' }}
    } 
}

export const changePassword = async (token: string | null, changePasswordData: ChangePasswordFormValues): Promise<{ data?: { message: string}, error?: { message: string} }> => {
    try {
        const response = await fetch(`${API_ROUTE}/change-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`
            }, 
            body: JSON.stringify(changePasswordData)
        }); 
        if(!response.ok) {
            return { error: { message: await response.text() } }; 
        }
        const data = await response.json(); 
        return { data }; 
    } catch(err: any) {
        return { error: err }
    }
}