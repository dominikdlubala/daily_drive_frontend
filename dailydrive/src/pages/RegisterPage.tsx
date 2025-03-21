import './styles/registerPage.css'; 

import { useState, useEffect } from 'react'; 
import { SubmitHandler } from 'react-hook-form'; 
import { useNavigate } from 'react-router-dom'; 

import Prompt from '../components/primitives/Prompt'; 

import { registerUser } from '../services/UserService';
import type { MyError } from '../types'; 
import RegisterForm, { RegisterFormValues } from '../components/login/RegisterForm';


export default function RegisterPage() {

    const [isError, setIsError] = useState<MyError>({error: false}); 
    const [isSuccess, setIsSuccess] = useState(false); 

    const navigate = useNavigate(); 

    const onSubmit: SubmitHandler<RegisterFormValues> = async (formValues: RegisterFormValues) => {
        const { error } = await registerUser(formValues); 
        if(error){
            setIsError({ error: true, message: error.message }); 
        } else {
            setIsSuccess(true); 
            setTimeout(() => {
                navigate('/login'); 
            }, 2500); 
        }
    }

    useEffect(() => {
        if(isSuccess){
            const timer = setTimeout(() => {
                setIsSuccess(false); 
            }, 2000); 

            return () => clearTimeout(timer); 
        }
        if(isError) {
            const timer = setTimeout(() => {
                setIsError({ ...isError, error: false })
            }, 2000);

            return () => clearTimeout(timer); 
        }

    }, [isSuccess, isError])

    return (
        <div className="page page-register">
            <div className="form-wrapper form-wrapper--register">
                <RegisterForm onSubmit={onSubmit} />
            </div>

            { isSuccess && <Prompt success handleClose={() => setIsSuccess(false)}>Użytkownik został zarejestrowany</Prompt>}
            { isError.error && <Prompt error handleClose={() => setIsError({ ...isError, error: false })}>{isError.message}</Prompt>}

        </div>
    )
}