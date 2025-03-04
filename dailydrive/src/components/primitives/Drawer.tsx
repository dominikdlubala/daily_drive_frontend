import { useRef, useEffect, useState } from 'react'; 
import type { ReactNode } from 'react'; 
import React from 'react';

import Modal from '../primitives/Modal';
import WorkoutTemplateForm from '../workouts/WorkoutTemplateForm';
import WorkoutFreeForm from '../workouts/WorkoutFreeForm';

import type { CurrentWorkout } from '../../types'; 
// import { useAppDispatch } from '../../hooks/useAppDispatch';
// import { useAppSelector } from '../../hooks/useAppSelector';
import { Navigate } from 'react-router-dom';

interface DrawerProps {
    isOpen: boolean; 
    onClose: () => void; 
    drawerConfig: { 
        [key: string]: { title: string, content: (handleModalClose: () => void) => ReactNode }
    };
    mainClasses?: string; 
    listItemClasses?: string; 
}

export default function Drawer({ isOpen, onClose, drawerConfig, mainClasses, listItemClasses }: DrawerProps) {

    // const dispatch = useAppDispatch(); 
    // const currentWorkout = useAppSelector(state => state.workout); 

    const [isModalOpen, setIsModalOpen] = useState<string | null>(null); 

    const handleModalOpen = (modalId: string) => {
        setIsModalOpen(modalId); 
    }
    const handleModalClose = (updatedWorkout?: CurrentWorkout) => {
        // updatedWorkout && dispatch(updateWorkout(updatedWorkout))
        setIsModalOpen(null); 
        onClose()
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
                    {drawerConfig[isModalOpen].content(handleModalClose)}
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
    // workoutTemplate: {
    //     title: 'Szablon treningu', 
    //     content: (handleModalClose: () => void) => <WorkoutTemplateForm handleModalClose={handleModalClose} />
    // }, 
    customWorkout: {
        title: 'Trening wolny', 
        content: (handleModalClose: () => void) =>  <WorkoutFreeForm />
    }, 
    cardioSession: {
        title: 'Sesja cardio', 
        content: (handleModalClose: () => void) => <div className="cos">cos</div>
    }
}

export const dietDrawerConfig = {
    addMeal: {
        title: 'Dodaj posiłek', 
        content: (handleModalClose: () => void) => <div className="cos">Dodaj</div>
    }, 
    showDiet: {
        title: 'Zobacz swoją dietę', 
        content: (handleModalClose: () => void) => <Navigate to='/diet' />
    }, 
    addProduct: {
        title: 'Dodaj produkt', 
        content: (handleModalClose: () => void) => <div className="cos">Kolacja</div>
    }
}