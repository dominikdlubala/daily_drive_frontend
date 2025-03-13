import './styles/dietPage.css'; 

import { useEffect, useState } from 'react'; 
import { FaCircleArrowLeft } from "react-icons/fa6";
import { FaCircleArrowRight } from "react-icons/fa6";

import DietToday from "../components/diet/DietToday";
import { DailyDiet } from '../types';
import { fetchDietByDate } from '../services/DietService';

export default function DietPage() {

    const [dietDate, setDietDate] = useState<Date>(new Date()); 
    const [dietData, setDietData] = useState<DailyDiet | null>(null); 

    const dateChange = ( forwards?: boolean ) => setDietDate(new Date(dietDate.setDate( forwards ? dietDate.getDate() + 1 : dietDate.getDate() - 1 )))

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await fetchDietByDate(dietDate);
            if(error) {
                setDietData(null); 
            } else {
                setDietData(data); 
            }
        }
        fetchData(); 
    }, [dietDate]);

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
            <DietToday data={dietData as DailyDiet} />
        </div>
    )
}