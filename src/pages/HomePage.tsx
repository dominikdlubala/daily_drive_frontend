import './styles/homePage.css'; 
import { useNavigate } from 'react-router-dom'; 

import { useEffect, useState } from 'react';
import { HomePageData } from '../types';
import { fetchHomePageData } from '../services/HomePageService';

import DietSummary from '../components/diet/DIetSumary';
import LastWorkoutItem from '../components/home/LastWorkoutItem';
import WorkoutWeekSummary from '../components/home/WorkoutWeekSummary';
import DietWeekSummary from '../components/home/DietWeekSummary';
import { useAuth } from '../hooks/useAuth';
import { usePrompt } from '../hooks/usePrompt';

export default function HomePage() {

    const { token } = useAuth();
    const { fault } = usePrompt(); 

    const navigate = useNavigate(); 
    const [homeData, setHomeData] = useState<HomePageData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const { data, error } = await fetchHomePageData(token as string);
            if(error) {
                fault(error);
                setIsLoading(false);
            } else {
                setHomeData(data)
                setIsLoading(false);
            }
        }
        fetchData();
    }, [token, fault])
    

    let content = (
        <div className="loading-skeleton">
            <div className="section section--home">
                <div className="sub-section">
                    <div className="skeleton-title"></div>
                    <div className="skeleton-chart"></div>
                    <div className="skeleton-recommendations">
                        <div className="skeleton-recommendation"></div>
                        <div className="skeleton-recommendation"></div>
                    </div>
                </div>
                <div className="sub-section">
                    <div className="skeleton-title"></div>
                    <div className="skeleton-chart"></div>
                </div>
            </div>
            <div className="side-section-home">
                <div className="side-section">
                    <div className="skeleton-title"></div>
                    <div className="skeleton-diet-summary"></div>
                </div>
                <div className="side-section side-section--workout">
                    <div className="skeleton-title"></div>
                    <div className="skeleton-last-workouts">
                        <div className="skeleton-workout-item"></div>
                        <div className="skeleton-workout-item"></div>
                        <div className="skeleton-workout-item"></div>
                    </div>
                </div>
            </div>
        </div>
    );

    if(!isLoading) {
        content = (
            <>
                <div className="section section--home">
                    <WorkoutWeekSummary homeData={homeData} />
                    <DietWeekSummary homeData={homeData} />
                </div>
                <div className="side-section-home">
                    <div className="side-section" onClick={() => navigate('/diet')}>
                        <h1>Dieta dzisiaj</h1>
                        <DietSummary 
                            data={homeData?.dailyDietToday ? homeData?.dailyDietToday : { totalCalories: 0, totalCarbs: 0, totalFat: 0, totalProtein: 0 }} 
                            dietGoal={homeData?.userGoal}
                            isHomePage={true}
                        />
                    </div>
                    <div className="side-section side-section--workout" onClick={() => navigate('/workouts?content=pastWorkouts')}>
                        <h1>Ostatnie treningi</h1>
                        <div className="side-section-items">
                            {
                                homeData?.lastWorkoutSessions.length === 0
                                ?
                                <div className="no-workouts">Nie masz jeszcze żadnych treningów</div>
                                :
                                homeData?.lastWorkoutSessions.map(ws => (
                                    <LastWorkoutItem key={ws.id} workoutData={ws} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </>
        )
    }


    return (
        <div className="page page-home">
            {content}
        </div>
    )
}