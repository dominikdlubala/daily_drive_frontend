import './styles/dietPage.css'; 

import { useEffect, useState } from 'react'; 
import { FaCircleArrowLeft } from "react-icons/fa6";
import { FaCircleArrowRight } from "react-icons/fa6";

import DietToday from "../components/diet/DietToday";
import { MyError, UserGoal } from '../types';
import { getUserGoals } from '../services/UserGoalService';
import { useAuth } from '../hooks/useAuth';

export default function DietPage() {
    const { token } = useAuth(); 
    
    const [userGoal, setUserGoal] = useState<UserGoal | undefined>(undefined);
    const [error, setError] = useState<MyError>();

    useEffect(() => {
        const fetchUserGoal = async () => { 
            const { data, error } = await getUserGoals(token); 
            if(error) {
                setError(error);
            } else {
                setUserGoal(data);
            }
        }

        fetchUserGoal();
    }, [token]);

    const [dietDate, setDietDate] = useState<Date>(new Date()); 

    const dateChange = ( forwards?: boolean ) => setDietDate(new Date(dietDate.setDate( forwards ? dietDate.getDate() + 1 : dietDate.getDate() - 1 )))

    return (
        <div className="page page-diet">
            <div className="page-diet--buttons">
                <FaCircleArrowLeft onClick={() => dateChange()} className="btn-change-date btn-change-date--backwards"/>
                <div className="current-date">
                    {
                        dietDate.getDate() === new Date().getDate()
                        ? 
                        'Dzisiaj'
                        :
                        dietDate.toLocaleDateString()
                    }
                </div>
                <FaCircleArrowRight onClick={() => dateChange(true)} className="btn-change-date btn-change-date--forward"/>
            </div>
            <DietToday date={dietDate} dietGoal={userGoal as UserGoal} />
        </div>
    )
}