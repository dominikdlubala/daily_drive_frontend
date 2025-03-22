import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ActivityLevel, Gender, WeightGoal } from "../../types";

export type RegisterFormValues = {
    firstName: string 
    lastName: string 
    height?: number; 
    weight?: number;
    gender?: Gender; 
    age?: number; 
    activityLevel?: string;
    weightGoal?: WeightGoal;
    goalCalories?: number;
    goalProtein?: number;
    goalCarbs?: number;
    goalFat?: number;
    email: string 
    username: string 
    password: string
}

interface RegisterFormProps {
    onSubmit: (formValues: RegisterFormValues) => void; 
}

export const calculateMacro = (gender: Gender, height: number, weight: number, activityLevel: ActivityLevel, age:number, weightGoal: WeightGoal) => {
    let bmr = 0;
    const activityLevelMultiplier = {
        LowActivity: 1.2,
        MediumActivity: 1.55,
        HighActivity: 1.725
    }
    const weightGoalMultiplier = (bmr: number, weightGoal: WeightGoal) => {
        switch(weightGoal) {
            case 'WeightLoss':
                return -(bmr * 0.15);
            case 'WeightGain':
                return 500;
            default:
                return 0;
        }
    }
    if(gender === 'Male') {
        bmr = (13.7516 * weight) + (5.0033 * height) - (6.7550 * age) + 66.4730;
    } else if (gender === 'Female') {
        bmr = (9.5634 * weight) + (1.8500 * height) - (4.6760 * age) + 655.0955;
    } else {
        bmr = (((13.7516+9.5634)/2) * weight) + (((5.0033+1.8500)/2) * height) - (((6.7550+4.6760/2)) * age) + ((66.4730+655.0955)/2);
    }
    const calories = bmr * activityLevelMultiplier[activityLevel] + weightGoalMultiplier(bmr, weightGoal);
    const protein = (calories * 0.35) / 4; 
    const carbs = (calories * 0.45) / 4; 
    const fat = (calories * 0.2) / 9;
    return {
        calories: Math.round(calories),
        protein: Math.round(protein),
        carbs: Math.round(carbs),
        fat: Math.round(fat)
    }
}

export default function RegisterForm({ onSubmit }: RegisterFormProps) {

    const [step, setStep] = useState(1); 

    const {
        register, 
        handleSubmit, 
        watch, 
        setValue,
        trigger,
        formState: { isSubmitting, errors }
    } = useForm<RegisterFormValues>(); 

    const gender = watch("gender");
    const height = watch("height");
    const weight = watch("weight");
    const activityLevel = watch("activityLevel");
    const age = watch("age");
    const weightGoal = watch("weightGoal");

    useEffect(() => {
        if(gender && height && weight && activityLevel && age && weightGoal) {
            const { calories, protein, carbs, fat } = calculateMacro(gender, height, weight, activityLevel as ActivityLevel, age, weightGoal);
            setValue("goalCalories", calories);
            setValue("goalProtein", protein);
            setValue("goalCarbs", carbs);
            setValue("goalFat", fat);
        }
    }, [gender, height, weight, activityLevel, age, weightGoal, setValue])

    const handleNextStep = async () => {
        let isValid = false; 
        if (step === 1) {
            isValid = await trigger(["firstName", "lastName", "email"]);
        } else if (step === 2) {
            isValid = await trigger(["height", "weight", "age", "gender", "activityLevel"]);
        } else if (step === 3) {
            isValid = await trigger(["weightGoal", "goalCalories", "goalProtein", "goalCarbs", "goalFat", "username", "password"]);
        }
        if(isValid) {
            setStep(step + 1);
        }
    }


    const step1Content = (
        <>
            <div className="form-group">
                <label className="form-label">Imię</label>
                <input 
                    type="text" 
                    className="form-input" 
                    { ...register("firstName")}
                />
            </div>
            <div className="form-group">
                <label className="form-label">Nazwisko</label>
                <input 
                    type="text" 
                    className="form-input" 
                    { ...register("lastName") }
                />
            </div>
            <div className="form-group">
                <label className="form-label">Email *</label>
                <input 
                    type="text" 
                    className="form-input" 
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
                { errors.email && <span className="input-validate">{errors.email.message}</span> }
            </div>
        </>
    )

    const step2Content = (
        <>
            <div className="form-group">
                <label className="form-label">Wzrost (cm) *</label>
                <input 
                    type="number" 
                    step="0.1"
                    className="form-input" 
                    { ...register("height", {
                        required: {
                            value: true, 
                            message: 'To pole jest wymagane'
                        },
                        min: {
                            value: 50, 
                            message: 'Minimalny wzrost to 50 cm'
                        },
                        max: {
                            value: 250, 
                            message: 'Maksymalny wzrost to 250 cm'
                        }
                    }) }
                />
                { errors.height && <span className="input-validate">{errors.height.message}</span> }
            </div>
            <div className="form-group">
                <label className="form-label">Waga (kg) *</label>
                <input 
                    type="number" 
                    step="0.1"
                    className="form-input" 
                    { ...register("weight", {
                        required: {
                            value: true, 
                            message: 'To pole jest wymagane'
                        },
                        min: {
                            value: 20, 
                            message: 'Minimalna waga to 20 kg'
                        },
                        max: {
                            value: 200, 
                            message: 'Maksymalna waga to 200 kg'
                        }
                    }) }
                />
                { errors.weight && <span className="input-validate">{errors.weight.message}</span> }
            </div>
            <div className="form-group">
                <label className="form-label">Wiek *</label>
                <input 
                    type="number" 
                    step="0.1"
                    className="form-input" 
                    { ...register("age", {
                        required: {
                            value: true, 
                            message: 'To pole jest wymagane'
                        },
                        min: {
                            value: 1, 
                            message: 'Minimalny wiek to 1 rok'
                        }, 
                        max: {
                            value: 120, 
                            message: 'Maksymalny wiek to 120 lat'
                        }
                    }) }
                />
                { errors.age && <span className="input-validate">{errors.age.message}</span> }
            </div>
            <div className="form-group">
                <label className="form-label">Płeć *</label>
                <select 
                    className="form-input"
                    defaultValue="" 
                    { ...register("gender", { required: { value: true, message: 'To pole jest wymagane'} })}
                >
                    <option value="" disabled>Wybierz płeć</option>
                    <option value="Male">Mężczyzna</option>
                    <option value="Female">Kobieta</option>
                    <option value="Other">Inne</option>
                </select>
                { errors.gender && <span className="input-validate">{errors.gender.message}</span> }
            </div>
            <div className="form-group">
                <label className="form-label">Poziom aktywności *</label>
                <select 
                    className="form-input"
                    defaultValue="" 
                    { ...register("activityLevel", { required: { value: true, message: 'To pole jest wymagane'} })}
                >
                    <option value="" disabled>Wybierz poziom aktywności</option>
                    <option value="LowActivity">Ćwiczę niewiele (1-2 / tydzień)</option>
                    <option value="MediumActivity">Ćwiczę umiarkowanie (3-4 / tydzień)</option>
                    <option value="HighActivity">Ćwiczę często (4-5 / tydzień)</option>
                </select>
                { errors.activityLevel && <span className="input-validate">{errors.activityLevel.message}</span> }
            </div>
        </>
    )

    const step3Content = (
        <>
            <div className="form-group">
                <label className="form-label">Twój cel *</label>
                <select
                    className="form-input"
                    defaultValue="" 
                    { ...register("weightGoal", { required: { value: true, message: 'To pole jest wymagane'} }) }
                >
                    <option value="" disabled>Wybierz cel</option>
                    <option value="WeightLoss">Chcę schudnąć</option>
                    <option value="WeightGain">Chcę nabrać masy</option>
                    <option value="WeightMaintenance">Chcę utrzymać wagę</option>
                </select>
                { errors.weightGoal && <span className="input-validate">{errors.weightGoal.message}</span> }
            </div>  
            <div className="form-macro-inputs">
                <div className="form-group">
                    <label className="form-label">Cel kalorii (g) *</label>
                    <input 
                        type="number" 
                        className="form-input" 
                        { ...register("goalCalories", {
                            required: {
                                value: true, 
                                message: 'To pole jest wymagane'
                            }, 
                        }) }
                    />
               { errors.goalCalories && <span className="input-validate">{errors.goalCalories.message}</span> }                    
                </div>  
                <div className="form-group">
                    <label className="form-label">Cel białka (g) *</label>
                    <input 
                        type="number" 
                        className="form-input" 
                        { ...register("goalProtein", {
                            required: {
                                value: true, 
                                message: 'To pole jest wymagane'
                            }, 
                        }) }
                    />
               { errors.goalProtein && <span className="input-validate">{errors.goalProtein.message}</span> }                    
                </div>  
                <div className="form-group">
                    <label className="form-label">Cel węglowodanów (g) *</label>
                    <input 
                        type="number" 
                        className="form-input" 
                        { ...register("goalCarbs", {
                            required: {
                                value: true, 
                                message: 'To pole jest wymagane'
                            }, 
                        }) }
                    />
               { errors.goalCarbs && <span className="input-validate">{errors.goalCarbs.message}</span> }                    
                </div>  
                <div className="form-group">
                    <label className="form-label">Cel tłuszczu (g) *</label>
                    <input 
                        type="number" 
                        className="form-input" 
                        { ...register("goalFat", {
                            required: {
                                value: true, 
                                message: 'To pole jest wymagane'
                            }, 
                        }) }
                    />
               { errors.goalFat && <span className="input-validate">{errors.goalFat.message}</span> }                    
                </div>  
            </div>
            {
                weightGoal 
                &&
                <div className="form-register--info">
                    Powyższe wartości są obliczane automatycznie na podstawie Twoich danych z użyciem równania Harrisa-Benedicta. Możesz je zmienić, jeśli chcesz.
                </div>
            }
            <div className="form-group">
                <label className="form-label">Nazwa użytkownika</label>
                <input 
                    type="text" 
                    className="form-input" 
                    { ...register("username", {
                        required: {
                            value: true, 
                            message: 'Nazwa użytkownika jest wymagana'
                        }
                    }) }
                />
                { errors.username && <span className="input-validate">{errors.username.message}</span> }
            </div>
            <div className="form-group">
                <label className="form-label">Hasło</label>
                <input 
                    type="password" 
                    className="form-input" 
                    { ...register("password", {
                        required: {
                            value: true, 
                            message: 'Hasło jest wymagane'
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
                { errors.password && <span className="input-validate">{errors.password.message}</span> }
            </div>
        </>
    )
    
    return (
        <>
            <h1 className="form-title form-title--register">
                Zarejestruj się { `${step}/3`}
            </h1>
            <form className="form form-register" onSubmit={handleSubmit(onSubmit)}>
                { step === 1 && step1Content}
                { step === 2 && step2Content}
                { step === 3 && step3Content}

                { 
                    step === 3 
                    && 
                    <button className="btn-submit" type="submit" disabled={isSubmitting}>
                        { isSubmitting ? 'Rejestruję...' : 'Zarejestruj' }
                    </button> 
                }

                <button className="btn-form-back"
                    style={{
                        display: step > 1 ? 'block' : 'none'
                    }} 
                    type="button" onClick={() => setStep(step - 1)}>
                    Wstecz
                </button>
                <button className="btn-form-forward" 
                    style={{
                        display: step === 3 ? 'none' : 'block'
                    }} 
                    type="button" onClick={handleNextStep}>
                    Dalej 
                </button>
            </form>
        </>
    )
}