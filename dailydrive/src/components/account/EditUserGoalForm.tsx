import { useForm } from "react-hook-form"
import { ActivityLevel, Gender, WeightGoal } from "../../types";
import { useEffect } from "react";
import { calculateMacro } from "../login/RegisterForm";

export type UserGoalFormValues = {
    weight: number;
    height: number;
    age: number;
    gender: Gender; 
    weightGoal: WeightGoal;
    activityLevel: ActivityLevel;
    goalCalories: number;
    goalProtein: number;
    goalCarbs: number;
    goalFat: number;
}

interface EditUserGoalFormProps {
    onSubmit: (formValues: UserGoalFormValues) => void;
    userGoal: UserGoalFormValues | null;
}

export default function EditUserGoalForm({ onSubmit, userGoal }: EditUserGoalFormProps) {
    const { 
        register, 
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isSubmitting } 
    } = useForm<UserGoalFormValues>({
        defaultValues: {
            weight: userGoal?.weight,
            height: userGoal?.height,
            age: userGoal?.age,
            gender: userGoal?.gender,
            weightGoal: userGoal?.weightGoal,
            activityLevel: userGoal?.activityLevel, 
            goalCalories: userGoal?.goalCalories,
            goalProtein: userGoal?.goalProtein,
            goalCarbs: userGoal?.goalCarbs,
            goalFat: userGoal?.goalFat,
        }
    })

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

    return (
        <form className="form form-edit--data" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label className="form-label">Wzrost (cm) *</label>
                <input 
                    type="number" 
                    className="form-input" 
                    { ...register("height", {
                        required: {
                            value: true, 
                            message: 'To pole jest wymagane'
                        }
                    }) }
                />
                { errors.height && <span className="input-validate">{errors.height.message}</span> }
            </div>
            <div className="form-group">
                <label className="form-label">Waga (kg) *</label>
                <input 
                    type="number" 
                    className="form-input" 
                    { ...register("weight", {
                        required: {
                            value: true, 
                            message: 'To pole jest wymagane'
                        }
                    }) }
                />
                { errors.weight && <span className="input-validate">{errors.weight.message}</span> }
            </div>
            <div className="form-group">
                <label className="form-label">Wiek *</label>
                <input 
                    type="number" 
                    className="form-input" 
                    { ...register("age", {
                        required: {
                            value: true, 
                            message: 'To pole jest wymagane'
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
            <button type="submit" className="btn-submit" disabled={isSubmitting}>Zapisz zmiany</button>
        </form>
    )

}
