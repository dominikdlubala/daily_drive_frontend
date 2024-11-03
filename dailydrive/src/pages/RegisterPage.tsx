import './styles/registerPage.css'; 

import { useState, useEffect } from 'react'; 
import { useForm, SubmitHandler } from 'react-hook-form'; 
import { useNavigate } from 'react-router-dom'; 

import Prompt from '../components/primitives/Prompt'; 
import { useAuth } from '../hooks/useAuth'; 

import { registerUser } from '../services/UserService';
import type { MyError } from '../types'; 

type FormValues = {
    firstName: string 
    lastName: string 
    email: string 
    username: string 
    password: string
}

export default function RegisterPage() {

    const [isError, setIsError] = useState<MyError>({error: false}); 
    const [isSuccess, setIsSuccess] = useState(false); 

    const navigate = useNavigate(); 

    const {
        register, 
        handleSubmit, 
        formState: { isSubmitting, errors }
    } = useForm<FormValues>(); 

    const onSubmit: SubmitHandler<FormValues> = async (formValues: FormValues) => {
        try {
            const { error } = await registerUser(formValues); 
            if(error){
                setIsError({ error: true, message: error.message }); 
            } else {
                setIsSuccess(true); 
                setTimeout(() => {
                    navigate('/login'); 
                }, 3500); 
            }
        } catch(error) {
            setIsError({ error: true, message: 'Unexpected error with registering a user'})
            setIsSuccess(false); 
        }
    }

    useEffect(() => {
        if(isSuccess){
            const timer = setTimeout(() => {
                setIsSuccess(false); 
            }, 3000); 

            return () => clearTimeout(timer); 
        }
        if(isError) {
            const timer = setTimeout(() => {
                setIsError({ ...isError, error: false })
            }, 3000);

            return () => clearTimeout(timer); 
        }

    }, [isSuccess, isError])

    return (
        <div className="page page-register">
            <div className="form-wrapper form-wrapper--register">
                <form className="form form-register" onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="form-title form-title--register">
                        Zarejestruj się
                    </h1>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-input" 
                            placeholder="Imię"
                            { ...register("firstName", {
                                required: {
                                    value: true, 
                                    message: 'Imię jest wymagane'
                                }
                            }) }
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-input" 
                            placeholder="Nazwisko"
                            { ...register("lastName", {
                                required: {
                                    value: true, 
                                    message: 'Nazwisko jest wymagane'
                                }
                            }) }
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-input" 
                            placeholder="Email"
                            { ...register("email", {
                                required: {
                                    value: true, 
                                    message: 'Email jest wymagany'
                                }
                            }) }
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-input" 
                            placeholder="Nazwa użytkownika"
                            { ...register("username", {
                                required: {
                                    value: true, 
                                    message: 'Nazwa użytkownika jest wymagana'
                                }
                            }) }
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            className="form-input" 
                            placeholder="Hasło"
                            { ...register("password", {
                                required: {
                                    value: true, 
                                    message: 'Hasło jest wymagane'
                                }
                            }) }
                        />
                    </div>
                    {Object.entries(errors).length > 0 && (
                        <span className="input-validate">{Object.entries(errors)[0][1].message}</span>
                    )}
                    <button className="btn-submit" type="submit" disabled={isSubmitting}>
                        { isSubmitting ? 'Rejestruję...' : 'Zarejestruj' }
                    </button>
                </form>
            </div>

            { isSuccess && <Prompt success handleClose={() => setIsSuccess(false)}>Użytkownik został zarejestrowany</Prompt>}
            { isError.error && <Prompt error handleClose={() => setIsError({ ...isError, error: false })}>{isError.message}</Prompt>}

        </div>
    )
}