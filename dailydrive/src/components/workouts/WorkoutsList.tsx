import '../styles/workoutsList.css';
import { useEffect, useState } from "react"
import WorkoutsListItem from "./WorkoutsListItem"
import { WorkoutSession } from "../../types";
import { fetchWorkoutSessions } from "../../services/WorkoutSessionService";

export default function WorkoutsList() {

    const [workoutsData, setWorkoutsData] = useState([] as WorkoutSession[]);

    useEffect(() => {
        const fetchWorkoutsData = async () => {
            const { data, error } = await fetchWorkoutSessions(); 
            if(error) {
                console.error(error); 
            } 
            if(data) {
                setWorkoutsData(data);
            }
        }

        fetchWorkoutsData(); 
    }, [])

    console.log(workoutsData)
    
    return (
        <div className="list list-workouts">
            {
                workoutsData.map((workout, index) => (
                    <WorkoutsListItem
                        key={workout.id}
                        workoutsData={workout}
                     />
                ))
            }
        </div>
    )
}
