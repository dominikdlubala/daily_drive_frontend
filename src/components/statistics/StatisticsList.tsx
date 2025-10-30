import { WorkoutStatistic } from "../../types"
import StatisticsListItem from "./StatisticsListItem"

interface StatisticsListProps {
    data: WorkoutStatistic[]
}

export default function StatisticsList({ data }: StatisticsListProps) {


    return (
        <div className="statistics-list"> 
            {data.map((stat) => (
                <StatisticsListItem key={stat.name} stat={stat} />
            ) )}
        </div>
    )
}