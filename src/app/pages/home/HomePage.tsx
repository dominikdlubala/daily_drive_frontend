import '../styles/homePage.css'; 
import { useNavigate } from 'react-router-dom'; 

import { useEffect, useState } from 'react';
import { HomePageData } from '../../../types';
import { fetchHomePageData } from '../../../services/HomePageService';

import LastWorkoutItem from '../../../features/home/components/LastWorkoutItem';
import WorkoutWeekSummary from '../../../features/home/components/WorkoutWeekSummary';
import DietWeekSummary from '../../../features/home/components/DietWeekSummary';
import { useAuth } from '../../../hooks/useAuth';
import { usePrompt } from '../../../hooks/usePrompt';
import DietSummary from 'src/features/diet/components/DietSumary';
import { useGetHomePageDataQuery } from 'src/api/queries/homePageApi';

export default function HomePage() {

    const { fault } = usePrompt(); 

    const navigate = useNavigate(); 

    const { data: homeData, isLoading, error } = useGetHomePageDataQuery(); 
    

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

    if(false) {
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