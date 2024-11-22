import { useRef, useEffect, useState, useCallback } from 'react'; 
import type { ReactElement } from 'react'; 
import React from 'react';

import Modal from '../primitives/Modal';
import WorkoutTemplateForm from '../workouts/WorkoutTemplateForm';
import WorkoutFreeForm from '../workouts/WorkoutFreeForm';

import type { CurrentWorkout } from '../../types'; 
import { updateWorkout } from '../../store';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';

interface DrawerProps {
    isOpen: boolean; 
    onClose: () => void; 
    drawerConfig: { 
        [key: string]: { title: string, content: ReactElement }
    };
    mainClasses?: string; 
    listItemClasses?: string; 
}

export default function Drawer({ isOpen, onClose, drawerConfig, mainClasses, listItemClasses }: DrawerProps) {

    const dispatch = useAppDispatch(); 
    const currentWorkout = useAppSelector(state => state.workout); 

    const [isModalOpen, setIsModalOpen] = useState<string | null>(null); 

    const handleModalOpen = (modalId: string) => {
        setIsModalOpen(modalId); 
    }
    const handleModalClose = (updatedWorkout?: CurrentWorkout) => {
        // updatedWorkout && dispatch(updateWorkout(updatedWorkout))
        setIsModalOpen(null); 
    }; 

    const drawerRef = useRef<HTMLDivElement | null>(null); 

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if(drawerRef.current && !drawerRef.current.contains(e.target as Node) && !isModalOpen){
                onClose(); 
            }
        }

        if(isOpen) document.addEventListener('mousedown', handleClickOutside); 

        return () => document.removeEventListener('mousedown', handleClickOutside); 
    }, [isOpen, onClose, isModalOpen])

    return (
        <div ref={drawerRef} className={`drawer drawer-workout ${mainClasses}`}>

            { 
                isModalOpen 
                &&
                <Modal
                    isOpen={true}
                    onClose={handleModalClose}
                >
                    {React.cloneElement(drawerConfig[isModalOpen].content, { handleModalClose: handleModalClose })}
                </Modal>
            }

            <ul className="drawer--list workout-drawer--list">
                { Object.keys(drawerConfig).map((key) => (
                    <li 
                        data-value={key}
                        className={`drawer--list-item workout-drawer--list-item ${listItemClasses}`}
                        onClick={() => handleModalOpen(key)}
                    >
                        {drawerConfig[key].title}
                    </li>
                ))}
                
            </ul>
        </div>
    )
}


export const workoutDrawerConfig = {
    workoutTemplate: {
        title: 'Szablon treningu', 
        content: <WorkoutTemplateForm />
    }, 
    customWorkout: {
        title: 'Trening wolny', 
        content: <WorkoutFreeForm />
    }, 
    cardioSession: {
        title: 'Sesja cardio', 
        content: <div className="cos">cos</div>
    }
}

export const dietDrawerConfig = {
    breakfast: {
        title: 'Śniadanie', 
        content: <div className="cos">Sniadnaie</div>
    }, 
    dinner: {
        title: 'Obiad', 
        content: <div className="cos">Obiad</div>
    }, 
    supper: {
        title: 'Kolacja', 
        content: <div className="cos">Kolacja</div>
    }
}