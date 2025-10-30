import { useEffect, useState } from "react"
import WorkoutsListItem from "./WorkoutsListItem"
import { WorkoutSession } from "../../types";
import { deleteWorkoutSession, fetchWorkoutSessions } from "../../services/WorkoutSessionService";
import { useAuth } from '../../hooks/useAuth';
import { usePrompt } from "../../hooks/usePrompt";

export default function WorkoutsList() {

    const { token } = useAuth();
    const { success, fault } = usePrompt();

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
            fault(error.message as string);
            return 
        } 
        success('Trening został usunięty');
        await refetchData()
    }

    const workoutsByMonth = workoutsData.reduce((acc, workout) => {
        const month = new Date(workout.startTime!).toLocaleString('pl-PL', { month: 'long', year: 'numeric' });
        if (!acc[month]) {
            acc[month] = [];
        }
        acc[month].push(workout);
        return acc;
    }, {} as Record<string, WorkoutSession[]>);
    
    return (
        <>
            <div className="workout-page--head">
                <div className="page-title">Historia treningów</div>
            </div>
            <div className="list list-workouts">
                {Object.keys(workoutsByMonth).map(month => (
                    <div className="month-wrapper" key={month}>
                        <div className="month-title">{month[0].toUpperCase()+month.slice(1)}</div>
                        <div className="workouts-list">
                            {
                                workoutsByMonth[month].map((workout, index) => (
                                    <WorkoutsListItem
                                        key={(workout.id as number)}
                                        workoutsData={workout}
                                        onDelete={() => handleDelete(workout.id as number)}
                                    />
                                ))
                            }
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
