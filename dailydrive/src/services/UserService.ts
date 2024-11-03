import type { User, UserLoginApiReturn } from '../types'; 

const API_URL = '/api/User'; 

export const findUser = async (username: string, password: string): Promise<UserLoginApiReturn> => {
    try {
        const response = await fetch(`${API_URL}/find`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                username: username, 
                password: password
            })
        })

        if(!response.ok) {
            if(response.status === 404){
                return { token: null, error: { error: true, message: 'User not found' } } 
            }
            return { token: null, error: { error: true, message: 'Unexpected error in UserService/findUSer' } }
        }

        const data = await response.json(); 
        return { token: data };  
    } catch (error) {
        return { token: null, error: { error: true, message: 'Unexpected error in UserService/findUser' } }
    }
}

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
            if(response.status === 404){
                return { token: null, error: { error: true, message: 'User not found' } } 
            }
            return { token: null, error: { error: true, message: 'Unexpected error in UserService/findUSer' } }
        }

        const data = await response.json() as { token: string }; 
        return { token: data.token };  
    } catch (error) {
        return { token: null, error: { error: true, message: 'Unexpected error in UserService/findUser' } }
    }
}

export const registerUser = async ({ firstName, lastName, email, username, password }: { firstName: string, lastName: string, email: string, username: string, password: string }): Promise<UserLoginApiReturn> => {
    try {
        console.log(email, username, password)

        const response = await fetch(`${API_URL}/register`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
            }, 
            body: JSON.stringify({
                firstName: firstName, 
                lastName: lastName,
                email: email, 
                username: username, 
                password: password
            })
        }); 

        if (!response.ok) {
            const errorText = await response.text(); 
            console.error('Server error:', errorText); 
            return { token: null, error: { error: true, message: errorText } }
        }

        return { token: null }
    } catch (error) {
        return { token: null, error: { error: true, message: 'Unexpected error / registerUser' } };
    }
}

