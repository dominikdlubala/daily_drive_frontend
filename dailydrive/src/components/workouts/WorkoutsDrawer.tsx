import { useRef, useEffect, useState } from 'react'; 

import Modal from '../primitives/Modal';
import WorkoutTemplateForm from './WorkoutTemplateForm';

interface WorkoutsDrawerProps {
    isOpen: boolean; 
    onClose: () => void; 
}

const drawerConfig = {
    workoutTemplate: {
        title: 'Szablon treningu', 
        content: <WorkoutTemplateForm />
    }, 
    customWorkout: {
        title: 'Trening wolny', 
        content: <div className="cos">cos</div>
    }, 
    cardioSession: {
        title: 'Sesja cardio', 
        content: <div className="cos">cos</div>
    }
}

type DrawerKey = keyof typeof drawerConfig; 

export default function WorkoutsDrawer({ isOpen, onClose }: WorkoutsDrawerProps) {

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
            if(drawerRef.current && !drawerRef.current.contains(e.target as Node)){
                onClose(); 
            }
        }

        if(isOpen) document.addEventListener('mousedown', handleClickOutside); 

        return () => document.removeEventListener('mousedown', handleClickOutside); 
    }, [isOpen, onClose])

    const handleWorkoutDrawerClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.preventDefault(); 
        const target = e.target as HTMLElement; 
        console.log(target.dataset.value); 
    }

    return (
        <div ref={drawerRef} className="drawer drawer-workout">

            { 
                isModalOpen 
                &&
                <Modal
                    isOpen={true}
                    onClose={closeModalHandler}
                >
                    {drawerConfig[isModalOpen as DrawerKey].content}
                </Modal>
            }

            <ul onClick={handleWorkoutDrawerClick} className="drawer--list workout-drawer--list">
                { (Object.keys(drawerConfig) as DrawerKey[]).map((key) => (
                    <li 
                        data-value={key}
                        className="drawer--list-item workout-drawer--list-item"
                        onClick={() => openModalHandler(key)}
                    >
                        {drawerConfig[key].title}
                    </li>
                ))}
                
            </ul>
        </div>
    )
}