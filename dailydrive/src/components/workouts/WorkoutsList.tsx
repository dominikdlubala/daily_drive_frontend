import '../styles/workoutsList.css';
import { useEffect, useState } from "react"
import WorkoutsListItem from "./WorkoutsListItem"
import { WorkoutSession } from "../../types";
import { deleteWorkoutSession, fetchWorkoutSessions } from "../../services/WorkoutSessionService";

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

    const refetchData = async () => {
        const { data, error } = await fetchWorkoutSessions(); 
        if(error) {
            console.error(error); 
        } 
        if(data) {
            setWorkoutsData(data);
        }
    }

    const handleDelete = async (id: number) => {
        const { data, error } = await deleteWorkoutSession(id); 
        if(error) {
            console.error(error); 
        }
        await refetchData()
    }
    
    return (
        <div className="list list-workouts">
            {
                workoutsData.map((workout, index) => (
                    <WorkoutsListItem
                        key={(workout.id as number) + index}
                        workoutsData={workout}
                        onDelete={() => handleDelete(workout.id as number)}
                     />
                ))
            }
        </div>
    )
}
