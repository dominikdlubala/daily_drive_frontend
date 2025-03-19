import '../styles/workoutsList.css';
import { useEffect, useState } from "react"
import WorkoutsListItem from "./WorkoutsListItem"
import { WorkoutSession } from "../../types";
import { deleteWorkoutSession, fetchWorkoutSessions } from "../../services/WorkoutSessionService";
import { useAuth } from '../../hooks/useAuth';

export default function WorkoutsList() {

    const { token } = useAuth();

    const [workoutsData, setWorkoutsData] = useState([] as WorkoutSession[]);

    useEffect(() => {
        const fetchWorkoutsData = async () => {
            const { data, error } = await fetchWorkoutSessions(token); 
            if(error) {
                console.error(error); 
            } 
            if(data) {
                setWorkoutsData(data);
            }
        }

        fetchWorkoutsData(); 
    }, [token])

    const refetchData = async () => {
        const { data, error } = await fetchWorkoutSessions(token); 
        if(error) {
            console.error(error); 
        } 
        if(data) {
            setWorkoutsData(data);
        }
    }

    const handleDelete = async (id: number) => {
        const { error } = await deleteWorkoutSession(token, id); 
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
