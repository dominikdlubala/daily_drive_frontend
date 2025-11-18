import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { BodyPart, HomePageData } from '../../types';
import { useEffect, useState } from 'react';

interface WorkoutWeekSummaryProps {
    homeData: HomePageData | null;
}

export default function WorkoutWeekSummary({ homeData }: WorkoutWeekSummaryProps) {

    const [showError, setShowError] = useState(false);

    useEffect(() => {
        if(!homeData || homeData?.weightLifted === 0) {
            setShowError(true);
        }
    }, [homeData])

    const translateBodyPart = (bodyPart?: BodyPart) => { 
        switch(bodyPart) {
            case 'Chest': return 'Klatka piersiowa';
            case 'Back': return 'Plecy';
            case 'Shoulders': return 'Barki';
            case 'Legs': return 'Nogi';
            case 'Arms': return 'Ramiona';
            default: return 'Inne';
        }
    }

    const generateChartData = () => {
        const daysOfWeek = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];
        const chartData = daysOfWeek.map(day => {
            const session = homeData?.workoutSessions.find(ws => new Date(ws.date).toLocaleDateString('pl-PL', { weekday: 'long' }) === day.toLowerCase());
            return {
                day,
                timeSpent: session ? Math.round(session.timeSpent) : 0,
                weightLifted: session ? Math.round(session.weightLifted) : 0
            };
        });
        return chartData;
    };

    return (
        <div 
            className="sub-section workouts-section workouts-section--home"
        >
            <h1 className="sub-section--title workouts-title--home">Twój tydzień w treningach</h1>
            { showError && <div className="week-summary--error">Dodaj więcej danych aby zobaczyć statystyki</div>}
            <div className="sub-section--details workouts-details--home">
                <div className="home-workout-summary">
                    <div> Łącznie podniosłeś: <span>{homeData?.weightLifted || 0} kg</span></div>
                    <div> Spędziłeś na treningu: <span>{homeData?.timeSpent || 0} min</span></div>
                </div>
                <div className="home-workout-graph">
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={generateChartData()}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                            <Tooltip formatter={(value, name) => [value, name === 'timeSpent' ? 'Czas na treningu' : 'Ciężar na treningu']} />
                            <Legend formatter={(x) => x === 'timeSpent' ? 'Czas na treningu' : 'Łączny ciężar' } />
                            <Line yAxisId="left" type="monotone" dataKey="timeSpent" stroke="#8884d8" />
                            <Line yAxisId="right" type="monotone" dataKey="weightLifted" stroke="#82ca9d" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="home-workout-recommendations">
                    <div className='recommendation'> 
                        Do tej pory najwięcej trenowałeś: 
                        <div>
                            {homeData?.mostTrained.map(bp => (
                                <div className="body-part" key={bp}>
                                    {translateBodyPart(bp) + ' '}
                                </div>
                            ))} 
                        </div>
                    </div>
                    <div className='recommendation'> 
                        W następnym treningu zalecamy trenować: 
                        <div className="body-part"> {translateBodyPart(homeData?.recommendedBodyPart)} </div>
                    </div>
                </div>
            </div>
        </div>
    )
}