import { useState, useRef, useEffect } from 'react'; 

import Modal from './Modal';
import WorkoutTemplateForm from '../workouts/WorkoutTemplateForm';

export default function Footer() {

    const [isWorkoutDrawerOpen, setIsWorkoutDrawerOpen] = useState<boolean>(false); 
    const [isDietDrawerOpen, setIsDietDrawerOpen] = useState<boolean>(false); 

    const [modalOpen, setModalOpen] = useState<boolean>(true); 

    const workoutDrawerRef = useRef<HTMLDivElement | null>(null);
    const dietDrawerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                isWorkoutDrawerOpen &&
                workoutDrawerRef.current &&
                !workoutDrawerRef.current.contains(e.target as Node)
            ) {
                setIsWorkoutDrawerOpen(false); 
            }
        }; 

        document.addEventListener('mousedown', handleClickOutside); 
        return () => document.removeEventListener('mousedown', handleClickOutside); 
    }, [isWorkoutDrawerOpen])

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                isDietDrawerOpen &&
                dietDrawerRef.current &&
                !dietDrawerRef.current.contains(e.target as Node)
            ) {
                setIsDietDrawerOpen(false); 
            }
        }; 

        document.addEventListener('mousedown', handleClickOutside); 
        return () => document.removeEventListener('mousedown', handleClickOutside); 
    }, [isDietDrawerOpen])

    const handleWorkoutDrawerClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.preventDefault(); 
        const target = e.target as HTMLElement; 
        console.log(target.dataset.value); 
    }

    const handleDietDrawerClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.preventDefault(); 
        const target = e.target as HTMLElement; 
        console.log(target.dataset); 
    }

    return(
        <div className="footer">
            <Modal>
                <WorkoutTemplateForm />
            </Modal>

            <div className="buttons--footer">
                <div ref={workoutDrawerRef} className="buttons--footer-group">
                    <button onClick={() => {
                        setIsWorkoutDrawerOpen(!isWorkoutDrawerOpen)
                    }} className="btn-primary btn--add-workout">
                        Trening +
                    </button>
                    { 
                        isWorkoutDrawerOpen 
                        &&
                        <div className="drawer drawer-workout">
                            <ul onClick={handleWorkoutDrawerClick} className="drawer--list workout-drawer--list">
                                <li 
                                data-value="trening1"
                                className="drawer--list-item workout-drawer--list-item">
                                    Wzór treningowy
                                </li>
                                <li 
                                data-value="trening2"
                                className="drawer--list-item workout-drawer--list-item">
                                    Trening dowolny
                                </li>
                                <li 
                                data-value="trening3"
                                className="drawer--list-item workout-drawer--list-item">
                                    Sesja cardio
                                </li>
                            </ul>
                        </div>
                    }
                </div>

                <div ref={dietDrawerRef} className="buttons--home-group">
                    <button onClick={() => {
                        setIsDietDrawerOpen(!isDietDrawerOpen)
                    }} className="btn-primary btn--add-diet">
                        Posiłek +
                    </button>
                    { 
                        isDietDrawerOpen 
                        &&
                        <div className="drawer drawer-diet">
                            <ul onClick={handleDietDrawerClick} className="drawer--list diet-drawer--list">
                                <li 
                                data-value="diet1"
                                className="drawer--list-item diet-drawer--list-item">
                                    Śniadanie
                                </li>
                                <li 
                                data-value="diet2"
                                className="drawer--list-item diet-drawer--list-item">
                                    Obiad
                                </li>
                                <li 
                                data-value="diet3"
                                className="drawer--list-item diet-drawer--list-item">
                                    Kolacja
                                </li>
                            </ul>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}