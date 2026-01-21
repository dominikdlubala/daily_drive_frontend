import '../styles/loginPage.css'; 

import { useState } from 'react'; 
import { useForm, SubmitHandler } from 'react-hook-form'; 
import { Link } from 'react-router-dom'; 

import { useAuth } from '../../../hooks/useAuth'; 

type FormValues = {
    username: string 
    password: string
}

export default function LoginPage() {

    const { login } = useAuth(); 
    const [error, setError] = useState<string | undefined>(); 

    const { 
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting }
    } = useForm<FormValues>(); 

    const onSubmit: SubmitHandler<FormValues> = async ({ username, password }) => {
        const { error } = await login({ username, password }); 
        if(error) {
            setError(error.message)
        }
    }

    return (
        <div className="page page-login">
            <div className="form-wrapper--login">
                <form className="form form-login" onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="form-title form-title--login">Zaloguj się</h1>
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-input--login"
                            placeholder="Nazwa użytkownika"
                            {...register("username", {
                                required: {
                                    value: true, 
                                    message: 'Nazwa użytkownika jest wymagana'
                                }
                            })}
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            className="form-input--login" 
                            placeholder="Hasło"  
                            {...register("password", {
                                required:{
                                    value: true, 
                                    message: 'Hasło jest wymagane'
                                }, 
                            })}
                        />
                    </div>
                    {Object.entries(errors).length > 0 && (
                        <span className="input-validate">{Object.entries(errors)[0][1].message}</span>
                    )}
                    {
                        error && <span className="input-validate input-validate--login">{error}</span>
                    }
                    <button 
                        className="btn-submit btn-submit--login"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Loguję...' : 'Zaloguj'}
                    </button>
                </form>
                <div className="register-link--login">
                    <span>Nie masz konta?</span> <br/>
                    <Link to={'/register'}>Zarejestruj się</Link>
                </div>
            </div>
        </div>
    )
}
