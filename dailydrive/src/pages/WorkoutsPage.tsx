import './styles/workoutsPage.css';
import { useState } from 'react';

import WorkoutsGallery from '../components/workouts/WorkoutsGallery';
import WorkoutsList from '../components/workouts/WorkoutsList';
import Modal from '../components/primitives/Modal';
import WorkoutFreeForm2 from '../components/workouts/WorkoutFreeForm2';

export default function WorkoutsPage() {

    const [pageContent, setPageContent] = useState<string>('customWorkouts');  

    const handleWorkoutsButtonsClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.preventDefault(); 
        const target = e.target as HTMLElement; 
        if(target.nodeName === 'BUTTON')
            setPageContent(target.dataset.value as string); 
    }
    
    let content; 
    if(pageContent === 'customWorkouts') {
        content = <WorkoutsGallery />
    } else if(pageContent === 'pastWorkouts') {
        content = <WorkoutsList />
    }


    const [isModalOpen, setIsModalOpen] = useState(false); 

    return (
        <div className="page page-workouts">

            {
                isModalOpen
                &&
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <WorkoutFreeForm2 handleModalClose={() => setIsModalOpen(false)} />
                </Modal>
            }

            <div onClick={handleWorkoutsButtonsClick} className="section--workouts-buttons">
                <button 
                    data-value="customWorkouts"
                    className={`btn-workouts ${pageContent === 'customWorkouts' ? 'btn-workouts--active' : ''}`}
                >
                    Wzorce treningowe
                </button>
                <button 
                    data-value="pastWorkouts"
                    className={`btn-workouts ${pageContent === 'pastWorkouts' ? 'btn-workouts--active' : ''}`}
                >
                    Historia treningów
                </button>
            </div>
            {content}

            <button className="btn btn-current-workout" onClick={() => setIsModalOpen(true)}>Trening</button>
        </div>
    )
}