import { useState, useEffect } from 'react'; 
import { useAuth } from '../../hooks/useAuth';
import { useAppSelector } from '../../hooks/useAppSelector';

import Modal from './Modal';
import WorkoutFreeForm from '../workouts/WorkoutFreeForm';
import Drawer, { workoutDrawerConfig, dietDrawerConfig } from './Drawer';

export default function Footer() {

    const { token } = useAuth(); 

    const { isWorkoutActive, startDate } = useAppSelector(state => state.workout.currentWorkout); 

    const [isModalOpen, setIsModalOpen] = useState(false); 

    const [isWorkoutDrawerOpen, setIsWorkoutDrawerOpen] = useState<boolean>(false); 
    const [isDietDrawerOpen, setIsDietDrawerOpen] = useState<boolean>(false); 

    const [elapsedTime, setElapsedTime] = useState<number>(0); 

    const footerClassNames = 'footer ' + ((token === null ) ? 'footer-hide' : ''); 

    const handleModalOpen = () => {
        setIsModalOpen(true); 
    }

    const formatTime = (seconds: number): string => {
        const hrs = Math.floor(seconds/3600); 
        const mins = Math.floor((seconds % 3600) /60); 
        const secs = seconds % 60; 

        return `${ hrs ? (hrs.toString().padStart(2, '0') + ':') : ''}${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`; 
    }

    useEffect(() => {
        if(isWorkoutActive && startDate) {
            const startTime = new Date(startDate).getTime(); 

            const interval = setInterval(() => {
                const now = new Date().getTime(); 
                setElapsedTime(Math.floor((now-startTime)/1000)); 
            }, 1000); 

            return () => clearInterval(interval); 
        } else {
            setElapsedTime(0); 
        }
    }, [isWorkoutActive, startDate])


    return(
        <div className={footerClassNames}>
            {
                isModalOpen
                &&
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <WorkoutFreeForm handleModalClose={() => setIsModalOpen(false)} />
                </Modal>
            }

            <div className="buttons--footer">
                <div className="buttons--footer-group">
                    <button onClick={() => {
                        setIsWorkoutDrawerOpen(!isWorkoutDrawerOpen)
                    }} className="btn-primary btn--add-workout"
                    >
                        Trening +
                    </button>
                    { 
                        isWorkoutDrawerOpen 
                        &&
                        <Drawer 
                            isOpen={isWorkoutDrawerOpen} 
                            onClose={() => setIsWorkoutDrawerOpen(false)}
                            drawerConfig={workoutDrawerConfig}
                        />
                    }
                </div>

                {
                    isWorkoutActive 
                    &&    
                    <div className="buttons--footer-group">
                        <button
                            onClick={handleModalOpen}
                            className="btn-primary btn--current-workout btn--add-workout"
                        >

                            { formatTime(elapsedTime) + ' Teraz'}
                        </button>
                    </div>
                }

                <div className="buttons--footer-group">
                    <button 
                        onClick={() => {
                        setIsDietDrawerOpen(!isDietDrawerOpen)
                    }} className="btn-primary btn--add-diet">
                        Posiłek +
                    </button>
                    { 
                        isDietDrawerOpen 
                        &&
                       <Drawer
                            isOpen={isDietDrawerOpen}
                            onClose={() => setIsDietDrawerOpen(false)}
                            drawerConfig={dietDrawerConfig}
                       />
                    }
                </div>
            </div>
        </div>
    )
}