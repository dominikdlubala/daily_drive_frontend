import './styles/registerPage.css'; 

import { useState } from 'react'; 
import { SubmitHandler } from 'react-hook-form'; 
import { useNavigate } from 'react-router-dom'; 

import { registerUser } from '../services/UserService';
import type { MyError } from '../types'; 
import RegisterForm, { RegisterFormValues } from '../components/login/RegisterForm';
import { usePrompt } from '../hooks/usePrompt';


export default function RegisterPage() {

    const { success, fault } = usePrompt();  
    const [isError, setIsError] = useState<MyError>({error: false}); 
    

    const navigate = useNavigate(); 

    const onSubmit: SubmitHandler<RegisterFormValues> = async (formValues: RegisterFormValues) => {
        const { error } = await registerUser(formValues); 
        if(error){
            setIsError({ error: true, message: error.message }); 
            fault(error.message as string); 
        } else {
            success('Pomyślnie zarejestrowano użytkownika'); 
            navigate('/login');  
        }
    }

    return (
        <div className="page page-register">
            <div className="form-wrapper--login">
                <RegisterForm onSubmit={onSubmit} />
            </div>
        </div>
    )
}