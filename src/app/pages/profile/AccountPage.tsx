import '../styles/accountPage.css';

import { useEffect, useState } from "react";
import { ActivityLevel, Gender, User } from "../../../types";
import { useAuth } from "../../../hooks/useAuth";
import { changePassword, getUserData, updateUserData } from "../../../services/UserService";
import { MdEdit } from 'react-icons/md';
import Modal from '../../../components/primitives/Modal';
import { SubmitHandler } from 'react-hook-form';
import EditUserDataForm, { UserDataFormValues } from '../../../features/account/components/EditUserDataForm';
import { updateUserGoal } from '../../../services/UserGoalService';
import { usePrompt } from '../../../hooks/usePrompt';
import EditUserGoalForm, { UserGoalFormValues } from 'src/features/account/components/EditUserGoalForm';
import ChangePasswordForm, { ChangePasswordFormValues } from 'src/features/account/components/ChangePasswordForm';

export default function AccountPage() {
    const { token } = useAuth(); 
    const { success, fault } = usePrompt();

    const [userData, setUserData] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editType, setEditType] = useState<'user' | 'userGoal' | 'passwordChange'>('user');

    useEffect(() => {
        const fetchUserData = async () => {
            const { data, error } = await getUserData(token);
            error ? setError(error.message) : setUserData(data);
        }

        fetchUserData();
    }, [token])

    const refetchData = async () => {
        const { data, error } = await getUserData(token);
        if(error) {
            setError(error.message);
        } else {
            setUserData(data);
        }
    }

    const activityLevels = {
        LowActivity: 'Ćwiczę niewiele (1-2 / tydzień)',
        MediumActivity: 'Ćwiczę umiarkowanie (3-4 / tydzień)',
        HighActivity: '>Ćwiczę często (4-5 / tydzień)',
        Adaptive: 'System adaptacyjny'
    }

    const genders = {
        Male: 'Mężczyzna',
        Female: 'Kobieta',
        Other: 'Inna',
    }

    const onSubmitData: SubmitHandler<UserDataFormValues> = async (formValues: UserDataFormValues) => {
        const { error } = await updateUserData(token, formValues);
        if(error) {
            fault(error.message);
        } else {
            success('Dane zostały zaktualizowane');
            setIsModalOpen(false);
            refetchData();
        }
    }
    const onSubmitGoal: SubmitHandler<UserGoalFormValues> = async (formValues: UserGoalFormValues) => {
        const { error } = await updateUserGoal(token, formValues, userData?.userGoal?.id as number);
        if(error) {
            fault(error.message);
        } else {
            success('Cel został zaktualizowany');
            setIsModalOpen(false);
            refetchData(); 
        }
    }

    const onSubmitPassword: SubmitHandler<ChangePasswordFormValues> = async (formValues: ChangePasswordFormValues) => {
        const { data, error } = await changePassword(token, formValues); 
        if(error){
            fault(error.message); 
        } else if(data) {
            success(data.message);
            setIsModalOpen(false); 
        } else {
            fault('Coś poszło nie tak'); 
        }
    }

    return (
        <div className="page page-account">
            {
                isModalOpen 
                && 
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <>
                        {error && <span className="input-validate">{error}</span>}
                        {

                            editType === 'passwordChange'
                            ?
                            <ChangePasswordForm onSubmit={onSubmitPassword} />
                            :
                            (
                                editType === 'user' 
                                ? 
                                <EditUserDataForm onSubmit={onSubmitData} userData={userData as UserDataFormValues} /> 
                                : 
                                <EditUserGoalForm onSubmit={onSubmitGoal} userGoal={{
                                    ...userData?.userGoal, 
                                    height: userData?.height,
                                    weight: userData?.weight,
                                    age: userData?.age,
                                    gender: userData?.gender, 
                                    activityLevel: userData?.activityLevel
                                } as UserGoalFormValues} />
                            )
                        }
                    </>
                </Modal>
            }


            <div className="user-data">
                <div className="user-header">
                    <img src={userData?.gender === 'Male' ? `images/avatar-male.svg` : 'images/avatar-female.svg'} alt="avatar-man" className="avatar-image" /> 
                    <div className="user-name">
                        Cześć, { userData?.firstName ? userData?.firstName : userData?.username }
                    </div>
                </div>
                <div className="user-main-data">
                    <div className="user-data-head">
                        <div className="user-main-data--title">Twoje podstawowe dane</div>
                        <div className="acc-buttons">
                            <button 
                                className="btn-edit btn-change-password"
                                onClick={() => {
                                    setEditType('passwordChange'); 
                                    setIsModalOpen(true); 
                                }}
                            >
                                Zmień hasło
                            </button>
                            <button onClick={() => {
                                setEditType('user');
                                setIsModalOpen(true); 
                            }} className="btn-edit btn-edit--acount"><MdEdit/></button>
                        </div>
                    </div>
                    <div className="user-data--item">
                        <span className="data-item--label">Imię i nazwisko: </span> { 
                            userData?.firstName ? `${userData?.firstName} ${userData?.lastName}` : 'Nie podano'
                        }
                    </div>
                    <div className="user-data--item">
                        <span className="data-item--label">E-mail: </span> {userData?.email}
                    </div>
                    <div className="user-data--item">
                        <span className="data-item--label">Data rejestracji: </span> {new Date(userData?.registrationDate as Date).toLocaleDateString('pl-PL')}
                    </div>
                </div>
                <div className="user-main-data">
                    <div className="user-data-head">
                        <div className="user-main-data--title">Twoje dane treningowe</div>
                        <button onClick={() => {
                            setEditType('userGoal');
                            setIsModalOpen(true);
                        }} className="btn-edit btn-edit--acount"><MdEdit/></button>
                    </div>
                    <div className="user-data--item">
                        <span className="data-item--label">Wzrost: </span> {userData?.height} cm
                    </div>
                    <div className="user-data--item">
                        <span className="data-item--label">Waga: </span> {userData?.weight} kg
                    </div>
                    <div className="user-data--item">
                        <span className="data-item--label">Poziom aktywności: </span> {activityLevels[userData?.activityLevel as ActivityLevel]}
                    </div>
                    <div className="user-data--item">
                        <span className="data-item--label">Płeć: </span> {genders[userData?.gender as Gender]}
                    </div>
                    <div className="user-main-data--title">Twój cel dietetyczny</div>
                    <div className="user-data--item">
                        <span className="data-item--label">Cel główny: </span> {userData?.userGoal?.weightGoal === 'WeightLoss' ? 'Redukcja' : userData?.userGoal?.weightGoal === 'WeightGain' ? 'Masa' : 'Utrzymanie'} 
                    </div>
                    <div className="user-data--item">
                        <span className="data-item--label">Cel kaloryczny: </span> {userData?.userGoal?.goalCalories} kcal
                    </div>
                    <div className="user-data--item">
                        <span className="data-item--label">Cel białka: </span> {userData?.userGoal?.goalProtein} g
                    </div>
                    <div className="user-data--item">
                        <span className="data-item--label">Cel węglowodanów: </span> {userData?.userGoal?.goalCarbs} g
                    </div>
                    <div className="user-data--item">
                        <span className="data-item--label">Cel tłuszczy: </span> {userData?.userGoal?.goalFat} g
                    </div>
                </div>
            </div>
        </div>
    )
}