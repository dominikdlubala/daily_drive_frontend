import './styles/workoutsPage.css';
import { useState } from 'react';

import WorkoutsGallery from '../components/workouts/WorkoutsGallery';
import WorkoutsList from '../components/workouts/WorkoutsList';

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

    return (
        <div className="page page-workouts">
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

        </div>
    )
}