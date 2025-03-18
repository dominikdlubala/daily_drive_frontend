import './styles/homePage.css'; 
import { useNavigate } from 'react-router-dom'; 

// icons
import { FaCalendarAlt, FaClock, FaFire } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { BodyPart, HomePageData, MyError } from '../types';
import { fetchHomePageData } from '../services/HomePageService';

export default function HomePage() {

    const navigate = useNavigate(); 
    const [homeData, setHomeData] = useState<HomePageData | null>(null);
    // const [error, setError] = useState<MyError>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const { data, error } = await fetchHomePageData();
            if(error) {
                console.error(error)
            } else {
                setHomeData(data)
                setIsLoading(false);
            }
        }
        fetchData();
    }, [])

    const translateBodyPart = (bodyPart?: BodyPart) => { 
        switch(bodyPart) {
            case 'chest': return 'Klatka piersiowa';
            case 'back': return 'Plecy';
            case 'shoulders': return 'Barki';
            case 'legs': return 'Nogi';
            case 'arms': return 'Ramiona';
            default: return 'Inne';
        }
    }

    return (
        <div className="page page-home">
            <div className="section section--home">
                <div 
                    className="sub-section workouts-section workouts-section--home"
                    onClick={() => navigate('/workouts')}
                >
                    <h1 className="sub-section--title workouts-title--home">Twój tydzień w treningach</h1>
                    <div className="sub-section--details workouts-details--home">
                        <div className="home-workout-summary">
                            <div> Podniosłeś: {homeData?.weightLifted} kg </div>
                            <div> Spędziłeś na treningu: {homeData?.timeSpent} min </div>
                        </div>
                        <div className="home-workout-graph">
                            graph
                        </div>
                        <div className="home-workout-recommendations">
                            <div> 
                                Do tej pory najwięcej trenowałeś: 
                                {homeData?.mostTrained.map(bp => (
                                    <div className="body-part" key={bp}>
                                        {translateBodyPart(bp) + ' '}
                                    </div>
                                ))} 
                            </div>
                            <div> 
                                W następnym treningu zalecamy trenować: 
                                <div className="body-part"> {translateBodyPart(homeData?.recommendedBodyPart)} </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div 
                    className="sub-section diet-section diet-section--home"
                    onClick={() => navigate('/diet')}
                >
                    <h1 className=" sub-section--title diet-title--home">Dieta</h1>
                    <div className="sub-section--details  diet-details--home">
                        <div className="todays-diet--progress">
                            Progress bar
                        </div>
                        <div className="todays-diet--title">
                            Twoje posiłki dzisiaj: 
                        </div>
                        <div className="todays-diet--details">
                            <li className="todays-diet--list-item">
                                Śniadanie: 50g białko 30g tłuszcz 100g węglowodany
                            </li>
                            <li className="todays-diet--list-item">
                                Obiad: 80g białko 50g tłuszcz 120g węglowodany
                            </li>
                            <li className="todays-diet--list-item">
                                Kolacja: 30g białko 30g tłuszcz 90g węglowodany
                            </li>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}