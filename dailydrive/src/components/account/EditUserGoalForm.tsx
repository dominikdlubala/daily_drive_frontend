import { useForm } from "react-hook-form"
import { ActivityLevel, Gender, WeightGoal } from "../../types";
import { useEffect, useState } from "react";
import { calculateMacro } from "../login/RegisterForm";
import Tooltip from "../primitives/Tooltip";
import { MdQuestionMark } from "react-icons/md";

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

    const [isAdaptive, setIsAdaptive] = useState(false); 
    useEffect(() => {
        if(isAdaptive) {
            setValue("activityLevel", "Adaptive" as ActivityLevel); 
        }
    }, [isAdaptive, setValue]); 

    return (
        <form className="form form-edit--data" onSubmit={handleSubmit(onSubmit)}>
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
            <div className="form-group" >
                <label className="form-label">Poziom aktywności *</label>
                <label className="form-checkbox">
                    <input 
                        className="adaptive-checkbox"
                        type="checkbox" 
                        checked={isAdaptive}
                        onChange={(e) => setIsAdaptive(e.target.checked)}
                    />
                    Ustaw tryb adaptacyjny
                </label>
                <div className="adaptive-info">System adaptacyjny analizuje dane o Twoich treningach w konkretnym dniu i na tej podstawie dodaje odpowiednią ilość kalorii i makroelementów do Twojego celu</div>
                <select 
                    className={`form-input ${isAdaptive ? 'form-group--disabled' : ''}`}
                    defaultValue="" 
                    disabled={isAdaptive}
                    { ...register("activityLevel", { required: { 
                        value: !isAdaptive, 
                        message: 'To pole jest wymagane'
                    } })}
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
