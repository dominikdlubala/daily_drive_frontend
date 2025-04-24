import { useForm } from "react-hook-form";

export type ChangePasswordFormValues = {
    currentPassword: string; 
    newPassword: string; 
    confirmPassword: string;
}

interface ChangePasswordFormProps {
    onSubmit: (formData: ChangePasswordFormValues) => void; 
}

export default function ChangePasswordForm({ onSubmit }: ChangePasswordFormProps) {

    const { 
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting }, 
        watch 
    } = useForm<ChangePasswordFormValues>(); 

    const newPassword = watch("newPassword");

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label className="form-label">Twoje obecne hasło</label>
                <input 
                    type="password" 
                    className="form-input" 
                    { ...register("currentPassword", {
                        required: {
                            value: true, 
                            message: 'Obecne hasło jest wymagane'
                        },
                    }) }
                />
                { errors.currentPassword && <span className="input-validate">{errors.currentPassword.message}</span> }
            </div>
            <div className="form-group">
                <label className="form-label">Nowe hasło</label>
                <input 
                    type="password" 
                    className="form-input" 
                    { ...register("newPassword", {
                        required: {
                            value: true, 
                            message: 'Nowe hasło jest wymagane'
                        },
                        minLength: {
                            value: 6,
                            message: 'Hasło musi mieć co najmniej 6 znaków'
                        },
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                            message: 'Hasło musi zawierać co najmniej jedną cyfrę, jedną dużą literę, jedną małą literę i jeden znak specjalny'
                        }
                    }) }
                />
                { errors.newPassword && <span className="input-validate">{errors.newPassword.message}</span> }
            </div>
            <div className="form-group">
                <label className="form-label">Potwierdź hasło</label>
                <input 
                    type="password" 
                    className="form-input" 
                    { ...register("confirmPassword", {
                        required: {
                            value: true, 
                            message: 'Nowe hasło musi zostać potwierdzone'
                        }, 
                        validate: (value) => value === newPassword || "Hasła nie są identyczne"
                    }) }
                />
                { errors.confirmPassword && <span className="input-validate">{errors.confirmPassword.message}</span> }
            </div>
            <button className="btn-submit" disabled={isSubmitting}>{ isSubmitting ? 'Aktualizuję...' : 'Zaktualizuj hasło'}</button>
        </form>
    )
}