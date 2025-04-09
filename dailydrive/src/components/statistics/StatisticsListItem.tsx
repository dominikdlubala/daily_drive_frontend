import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { WorkoutStatistic } from "../../types";
import { round } from "../diet/MealForm";

export default function StatisticsListItem({ stat }: { stat: WorkoutStatistic }) {

    const generateChartData = () => {
        const dates = stat.weightExerciseStats.map(es => es.date.split('T')[0].split('-').reverse().join('.'));
        const chartData = dates.map(date => {
            const chartStat = stat.weightExerciseStats.find(es => es.date.split('T')[0].split('-').reverse().join('.') === date);
            return {
                date, 
                potential1RM: chartStat ? round(chartStat.potential1RM, 2) : 0,
            } 
        })
        return chartData; 
    }
    const minY = stat.lowest1RM; 
    const maxY = stat.highest1RM; 

    return (
        <div className="statistics-list--item">
            <div className="statistic-graph">
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={generateChartData()}>
                        <Line type="monotone" dataKey="potential1RM" stroke="#8884d8" />
                        <XAxis dataKey="date" />
                        <YAxis 
                            tickFormatter={value => `${value} kg`} 
                            domain={[minY, maxY]}    
                        />
                        <Tooltip formatter={(value, name) => [value = value + ' kg', name === 'potential1RM' ? 'Potencjalny 1RM' : name]} />
                        <CartesianGrid strokeDasharray="3 3" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className="statistic-data">
                <div className="statistic-data--item statistic-data--item--name">
                    <span>Ćwiczenie: </span>{stat.name}
                </div>
                <div className="statistic-data--item">
                    <span>Najsłabszy wynik: </span>{round(stat.lowest1RM, 2)} (1RM w kg)
                </div>
                <div className="statistic-data--item">
                    <span>Najlepszy wynik: </span>{round(stat.highest1RM, 2)} (1RM w kg)
                </div>
                <div className="statistic-data--item">
                    <span>Różnica: </span>{stat.percentageChange > 0 ? '+' : ''}{round(stat.percentageChange, 2)} %
                </div>
            </div>
        </div>
    )
}