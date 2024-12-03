import { useState } from "react"

import Modal from "../primitives/Modal"
import WorkoutTemplateForm from "./WorkoutTemplateForm"
import type { Exercise } from "../../types";
interface WorkoutsGalleryItemProps {
    workoutData: {title: string, exercises: Exercise[]}
}

export default function WorkoutsGalleryItem({ workoutData }: WorkoutsGalleryItemProps) {

    const [isModalOpen, setIsModalOpen] = useState(false); 

    return (
        <div className="gallery-item gallery-item--workouts" onClick={() => setIsModalOpen(true)}>
            {
                isModalOpen
                &&
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <WorkoutTemplateForm initialData={workoutData} />
                </Modal>
            }

            <div className="gallery-item--title">
                {workoutData.title}
            </div>
            <ul 
                className="gallery-item--exercises-list"
            >
                {workoutData.exercises.map(ex => (
                    <li 
                        className="gallery-item--exercise-item"
                        key={ex.name}
                    >
                        {ex.name}
                    </li>
                )).slice(0, 3)}
            </ul>
            <button className="gallery-item--button-start">
                Start workout
            </button>
        </div>
    )
} 