import './styles/statisticsPage.css'

import { ChangeEvent, useEffect, useState } from "react"
import { useAuth } from "../hooks/useAuth";
import { fetchStatisticsData } from "../services/StatisticsService";
import StatisticsList from "../components/statistics/StatisticsList";
import { WorkoutStatistic } from "../types";

export default function StatisticsPage() {
    const { token } = useAuth();

    const [selectedPeriod, setSelectedPeriod] = useState('month');
    const [statisticsData, setStatisticsData] = useState<WorkoutStatistic[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await fetchStatisticsData(token as string, selectedPeriod);
            if(error) {
                console.error(error);
            } else {
                setStatisticsData(data);
            }
        }

        fetchData(); 
    }, [token, selectedPeriod]); 


    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedPeriod(event.target.value);
    }

    return (
        <div className="page page-statistics">
            <div className="statistics-input">
                <div className="input-wrapper">
                    <div className="statistics-label">Wybierz okres czasowy</div>
                    <select className="statictist-select" value={selectedPeriod} onChange={handleSelectChange}>
                        <option value="month">Miesiąc</option>
                        <option value="3months">3 miesiące</option>
                        <option value="6months">6 miesięcy</option>
                    </select>
                </div>
            </div>
            <div className="statistics--head">
                <div className="page-title">
                    Statystyki treningowe
                </div>
                Poniżej znajdziesz porównanie wyników Twoich najczęściej wykonywanych ćwiczeń w wybranym okresie czasowym. 
                <div className="statistics--subhead">
                    <div>
                        Statystyki są wyświetlane w formie wykresu czasu od potencjalnego 1RM (jednorazowego maksymalnego powtórzenia). 
                    </div>
                    <div>
                        Oprócz tego, znajdziesz tutaj porównanie swojego najgorszego i najlepszego wyniku w danym okresie czasowym oraz różnicę w %. 
                    </div>
                </div>
            </div>

            <StatisticsList data={statisticsData} />

        </div>
    )
}