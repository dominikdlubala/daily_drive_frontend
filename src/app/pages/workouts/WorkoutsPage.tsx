import './workoutsPage.css';
import './workoutsPage.scss'; 
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import WorkoutsGallery from '../../../features/workouts/components/WorkoutsGallery';
import WorkoutsList from '../../../features/workouts/components/WorkoutsList';
import Modal from '../../../components/modal/components/Modal';
import WorkoutFreeForm from '../../../features/workouts/components/WorkoutFreeForm';

export default function WorkoutsPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const [pageContent, setPageContent] = useState<string>('customWorkouts');

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.get('content')) {
            setPageContent(params.get('content') as string);
        }
    }, [location]);

    const handleWorkoutsButtonsClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.preventDefault();
        const target = e.target as HTMLElement;
        if (target.nodeName === 'BUTTON') {
            const newContent = target.dataset.value as string;
            setPageContent(newContent);

            const params = new URLSearchParams(location.search);
            params.set('content', newContent);
            navigate({ search: params.toString() });
        }
    };

    let content;
    if (pageContent === 'customWorkouts') {
        content = <WorkoutsGallery />;
    } else if (pageContent === 'pastWorkouts') {
        content = <WorkoutsList />;
    }

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="page page-workouts">
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <WorkoutFreeForm handleModalClose={() => setIsModalOpen(false)} />
                </Modal>
            )}

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

            <button className="btn btn-current-workout" onClick={() => setIsModalOpen(true)}>
                Trening
            </button>
        </div>
    );
}