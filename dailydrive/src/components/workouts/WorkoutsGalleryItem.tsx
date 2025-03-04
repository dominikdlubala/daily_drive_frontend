import { useState } from "react"

import Modal from "../primitives/Modal"
import WorkoutTemplateForm from "./WorkoutTemplateForm"
import type { WorkoutTemplate } from "../../types";
interface WorkoutsGalleryItemProps {
    workoutData: WorkoutTemplate
}

export default function WorkoutsGalleryItem({ workoutData }: WorkoutsGalleryItemProps) {

    const [isModalOpen, setIsModalOpen] = useState(false); 

    return (
        <div className="gallery-item gallery-item--workouts" onClick={() => setIsModalOpen(true)}>
            {/* {
                isModalOpen
                &&
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <WorkoutTemplateForm initialData={workoutData} handleModalClose={() => setIsModalOpen(false)} />
                </Modal>
            } */}

            <div className="gallery-item--title">
                {workoutData.name}
            </div>
            <ul 
                className="gallery-item--exercises-list"
            >
                {workoutData.weightExercises.map((ex, index) => (
                    <li 
                        className="gallery-item--exercise-item"
                        key={ex + index}
                    >
                        {ex}
                    </li>
                )).slice(0, 3)}
            </ul>
            <button className="gallery-item--button-start">
                Start workout
            </button>
        </div>
    )
} 