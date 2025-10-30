import { useForm } from "react-hook-form"

export type UserDataFormValues = {
    username: string;
    email: string;
    firstName?: string;
    lastName?: string;
}

interface EditUserDataFormProps {
    onSubmit: (formValues: UserDataFormValues) => void;
    userData: UserDataFormValues | null;
}

export default function EditUserDataForm({ onSubmit, userData }: EditUserDataFormProps) {
    const { 
        register, 
        handleSubmit,
        formState: { errors, isSubmitting } 
    } = useForm<UserDataFormValues>({
        defaultValues: {
            username: userData?.username,
            email: userData?.email,
            firstName: userData?.firstName,
            lastName: userData?.lastName,
        }
    })

    return (
        <form className="form form-edit--data" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label className="form-label">Nazwa użytkownika</label>
                    <input
                        className="form-input" 
                        type="text" 
                        {...register('username', 
                            { required: {
                                value: true, 
                                message: 'To pole jest wymagane' 
                            }}
                        )} 
                    />

                    {errors.username && <span className="input-validate">To pole jest wymagane</span>}
                </div>
                <div className="form-group">
                    <label className="form-label">Imię</label>
                    <input
                        className="form-input" 
                        type="text" 
                        {...register('firstName')} />
                </div>
                <div className="form-group">
                    <label className="form-label">Nazwisko</label>
                    <input
                        className="form-input" 
                        type="text" 
                        {...register('lastName')} />
                </div>
                <div className="form-group">
                    <label className="form-label">E-mail</label>
                    <input
                        className="form-input" 
                        type="text"                      
                        { ...register("email", {
                            required: {
                                value: true, 
                                message: 'To pole jest wymagane'
                            }, 
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: 'Nieprawidłowy adres email'
                            }
                        }) } 
                    />
                    {errors.email && <span className="input-validate">{errors.email.message}</span>}
                </div>

                <button type="submit" className="btn-submit" disabled={isSubmitting}>Zapisz zmiany</button>
            </form>
    )

}
