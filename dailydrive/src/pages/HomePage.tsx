import './styles/homePage.css'; 
import { useNavigate } from 'react-router-dom'; 

// icons
import { FaCalendarAlt, FaClock, FaFire } from "react-icons/fa";

export default function HomePage() {

    const navigate = useNavigate(); 

    return (
        <div className="page page-home">
            <div className="section section--home">
                <div 
                    className="sub-section workouts-section workouts-section--home"
                    onClick={() => navigate('/workouts')}
                >
                    <h1 className="sub-section--title workouts-title--home">Trening</h1>
                    <div className="sub-section--details workouts-details--home">
                        <div className="last-workout--title">
                            Twój ostatni trening: 
                        </div>
                        <div className="last-workout--details">
                                <FaCalendarAlt/> 20.10.2024 <FaClock/> 2h 15min <FaFire/> 640kcal
                        </div>
                        <div className="workout-week-progress">
                            Twój postęp w tym tygodniu: 
                            <img src="" alt="some graph" />
                        </div>
                        <div className="workout-week-summary">
                            W tym tygodniu: 
                            podniosłeś: 700kg ciężaru
                            ćwiczyłeś: 17h 23min 
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