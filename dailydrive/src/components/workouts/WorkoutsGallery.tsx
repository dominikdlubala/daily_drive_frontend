import { useEffect, useState } from "react"
import WorkoutsGalleryItem from "./WorkoutsGalleryItem"
import { addWorkoutTemplate, fetchWorkoutTemplates, updateWorkoutTemplate } from "../../services/WorkoutService";
import { WorkoutTemplate, WorkoutTemplateApiReturn } from "../../types";
import Modal from "../primitives/Modal";
import WorkoutTemplateForm, { WorkoutTemplateFormValues } from "./WorkoutTemplateForm";


export default function WorkoutsGallery() {

    const [templates, setTemplates] = useState<WorkoutTemplateApiReturn | null>(null); 
    const [isModalOpen, setIsModalOpen] = useState(false); 

    useEffect(() => {
        const fetchTemplates = async () => {
            const response = await fetchWorkoutTemplates(); 
            setTemplates(response); 
        }

        fetchTemplates(); 
    }, []); 

    const refreshTemplates = async () => {
        const response = await fetchWorkoutTemplates();
        setTemplates(response);
    }

    const handleModalClose = async (formSubmitted?: boolean) => {
        setIsModalOpen(false); 
        formSubmitted && await refreshTemplates()
    } 

    const handleFormSubmit = async (formValues: WorkoutTemplateFormValues, add?: boolean) => {
        const data = add ? await addWorkoutTemplate({
            name: formValues.name, 
            weightExercises: formValues.weightExercises, 
            cardioExercises: formValues.cardioExercises
        } as Omit<WorkoutTemplate, 'id'>)
        : await updateWorkoutTemplate({
            id:  formValues.id,
            name: formValues.name, 
            weightExercises: formValues.weightExercises, 
            cardioExercises: formValues.cardioExercises
        } as WorkoutTemplate); 

        console.log(data); 
        handleModalClose(true); 
    }

    return (
        <div className="gallery gallery-workouts">
            {
                isModalOpen
                &&
                <Modal
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                >
                    <WorkoutTemplateForm handleModalClose={handleModalClose} handleSubmit={handleFormSubmit} />
                </Modal>
            }

            {templates?.data?.map((el, index) => (
                <WorkoutsGalleryItem key={el.id + index} workoutData={el} />
            ))}
            <button
                className="btn-primary workout-template--add-btn"
                onClick={() => setIsModalOpen(true)}    
            >Dodaj szablon</button>
        </div>
    )
}