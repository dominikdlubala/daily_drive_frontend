import './styles/homePage.css'; 

import { useState, useRef, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 

// icons
import { FaCalendarAlt, FaClock, FaFire } from "react-icons/fa";


export default function HomePage() {

    const navigate = useNavigate(); 

    const [isWorkoutDrawerOpen, setIsWorkoutDrawerOpen] = useState<boolean>(false); 
    const [isDietDrawerOpen, setIsDietDrawerOpen] = useState<boolean>(false); 

    const workoutDrawerRef = useRef<HTMLDivElement | null>(null);
    const dietDrawerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                isWorkoutDrawerOpen &&
                workoutDrawerRef.current &&
                !workoutDrawerRef.current.contains(e.target as Node)
            ) {
                setIsWorkoutDrawerOpen(false); 
            }
        }; 

        document.addEventListener('mousedown', handleClickOutside); 
        return () => document.removeEventListener('mousedown', handleClickOutside); 
    }, [isWorkoutDrawerOpen])

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                isDietDrawerOpen &&
                dietDrawerRef.current &&
                !dietDrawerRef.current.contains(e.target as Node)
            ) {
                setIsDietDrawerOpen(false); 
            }
        }; 

        document.addEventListener('mousedown', handleClickOutside); 
        return () => document.removeEventListener('mousedown', handleClickOutside); 
    }, [isDietDrawerOpen])

    const handleWorkoutDrawerClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.preventDefault(); 
        const target = e.target as HTMLElement; 
        console.log(target.dataset); 
    }

    const handleDietDrawerClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.preventDefault(); 
        const target = e.target as HTMLElement; 
        console.log(target.dataset); 
    }

    return (
        <div className="page page-home">
            <div className="section section--home">
                <div className="buttons--home">
                    <div ref={workoutDrawerRef} className="buttons--home-group">
                        <button onClick={() => {
                            setIsWorkoutDrawerOpen(!isWorkoutDrawerOpen)
                        }} className="btn-primary btn--add-workout">
                            Trening +
                        </button>
                        { 
                            isWorkoutDrawerOpen 
                            &&
                            <div className="drawer drawer-workout">
                                <ul onClick={handleWorkoutDrawerClick} className="drawer--list workout-drawer--list">
                                    <li 
                                    data-value="trening1"
                                    className="drawer--list-item workout-drawer--list-item">
                                        Wzór treningowy
                                    </li>
                                    <li 
                                    data-value="trening2"
                                    className="drawer--list-item workout-drawer--list-item">
                                        Trening dowolny
                                    </li>
                                    <li 
                                    data-value="trening3"
                                    className="drawer--list-item workout-drawer--list-item">
                                        Sesja cardio
                                    </li>
                                </ul>
                            </div>
                        }
                    </div>

                    <div ref={dietDrawerRef} className="buttons--home-group">
                        <button onClick={() => {
                            setIsDietDrawerOpen(!isDietDrawerOpen)
                        }} className="btn-primary btn--add-diet">
                            Posiłek +
                        </button>
                        { 
                            isDietDrawerOpen 
                            &&
                            <div className="drawer drawer-diet">
                                <ul onClick={handleDietDrawerClick} className="drawer--list diet-drawer--list">
                                    <li 
                                    data-value="diet1"
                                    className="drawer--list-item diet-drawer--list-item">
                                        Śniadanie
                                    </li>
                                    <li 
                                    data-value="diet2"
                                    className="drawer--list-item diet-drawer--list-item">
                                        Obiad
                                    </li>
                                    <li 
                                    data-value="diet3"
                                    className="drawer--list-item diet-drawer--list-item">
                                        Kolacja
                                    </li>
                                </ul>
                            </div>
                        }
                    </div>
                </div>
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