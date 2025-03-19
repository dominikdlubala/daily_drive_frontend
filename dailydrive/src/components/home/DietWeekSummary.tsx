import { HomePageData } from "../../types";
import { CartesianGrid, Legend, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface DietWeekSummaryProps {
    homeData: HomePageData | null;
}

export default function DietWeekSummary({ homeData }: DietWeekSummaryProps) {

    const generateChartData = () => {
        const daysOfWeek = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];
        const chartData = daysOfWeek.map(day => {
            const diet = homeData?.dailyDiets.find(d => new Date(d.date).toLocaleDateString('pl-PL', { weekday: 'long' }) === day.toLowerCase());
            return {
                day,
                totalCalories: diet ? diet.totalCalories : 0,
            };
        });
        return chartData;
    };

    const maxCalories = Math.max(homeData?.userGoal.goalCalories || 0, ...generateChartData().map(data => data.totalCalories));

    const translateMacro = (macro: string) => {
        switch(macro) {
            case 'Calories': return 'Kalorie';
            case 'Protein': return 'Białko';
            case 'Carbs': return 'Węglowodany';
            case 'Fat': return 'Tłuszcz';
            default: return 'Inne';
        }
    }

    return (
        <div 
            className="sub-section diet-section diet-section--home"
        >
            <h1 className=" sub-section--title diet-title--home">Twój tydzień w diecie</h1>
            <div className="sub-section--details  diet-details--home">
                <div className="home-diet-summary">
                    <div> Średnio kcal: <span>{homeData?.averageCal || 0} / {homeData?.userGoal.goalCalories} kcal</span></div>
                    <div> Średnio białka: <span>{homeData?.averageProtein || 0} / {homeData?.userGoal.goalProtein} g</span></div>
                    <div> Średnio węglowodanów: <span>{homeData?.averageCarbs || 0} / {homeData?.userGoal.goalCarbs} g</span></div>
                    <div> Średnio tłuszczy: <span>{homeData?.averageFat || 0} / {homeData?.userGoal.goalFat} g</span></div>
                </div>
                <div className="home-workout-graph">
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={generateChartData()}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" />
                            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" domain={[0, maxCalories]} />
                            <Tooltip formatter={(value, name) => [value, name]} />
                            <Legend formatter={(x) => x === 'goalCalories' ? 'Cel kalorii' : 'Kalorie'} />
                            <Line yAxisId="left" type="monotone" dataKey="totalCalories" stroke="#8884d8" name="Kalorie" />
                            <ReferenceLine yAxisId="left" y={homeData?.userGoal.goalCalories} stroke="red" strokeDasharray="3 3" label={{ position: 'top', value: 'Cel kalorii', fill: 'red' }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="home-workout-recommendations">
                    <div className='recommendation'> 
                        Najtrudniej jest ci osiągnąć cel:
                        <div className="body-part">
                            {`${translateMacro(homeData?.hardestToReachGoal as string)} (${ + Math.round(100 - (homeData?.goalDifference as number)) }% celu)`}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}