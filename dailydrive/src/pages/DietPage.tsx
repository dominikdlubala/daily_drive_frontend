import './styles/dietPage.css'; 

import { useState } from 'react'; 
import { FaCircleArrowLeft } from "react-icons/fa6";
import { FaCircleArrowRight } from "react-icons/fa6";

import DietToday from "../components/diet/DietToday";

export default function DietPage() {

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
                        'Today'
                        :
                        dietDate.toLocaleDateString()
                    }
                </div>
                <FaCircleArrowRight onClick={() => dateChange(true)} className="btn-change-date btn-change-date--forward"/>
            </div>
            <DietToday date={dietDate} />
        </div>
    )
}