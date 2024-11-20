import { useRef, useEffect, useState } from 'react'; 
import type { ReactNode } from 'react'; 

import Modal from '../primitives/Modal';
import WorkoutTemplateForm from '../workouts/WorkoutTemplateForm';
import WorkoutFreeForm from '../workouts/WorkoutFreeForm';

interface DrawerProps {
    isOpen: boolean; 
    onClose: () => void; 
    drawerConfig: { 
        [key: string]: { title: string, content: ReactNode }
    };
    mainClasses?: string; 
    listItemClasses?: string; 
}

export default function Drawer({ isOpen, onClose, drawerConfig, mainClasses, listItemClasses }: DrawerProps) {

    const [isModalOpen, setIsModalOpen] = useState<string | null>(null); 

    const openModalHandler = (modalId: string) => {
        setIsModalOpen(modalId); 
    }
    const closeModalHandler = () => {
        setIsModalOpen(null); 
    }

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
                    onClose={closeModalHandler}
                >
                    {drawerConfig[isModalOpen].content}
                </Modal>
            }

            <ul className="drawer--list workout-drawer--list">
                { Object.keys(drawerConfig).map((key) => (
                    <li 
                        data-value={key}
                        className={`drawer--list-item workout-drawer--list-item ${listItemClasses}`}
                        onClick={() => openModalHandler(key)}
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