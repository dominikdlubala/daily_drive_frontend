import { useEffect, useState } from "react"
import WorkoutsGalleryItem from "./WorkoutsGalleryItem"
import { addWorkoutTemplate, deleteWorkoutTemplate, fetchWorkoutTemplates, updateWorkoutTemplate } from "../../services/WorkoutTemplateService";
import { WorkoutTemplate, WorkoutTemplateApiReturn } from "../../types";
import Modal from "../primitives/Modal";
import WorkoutTemplateForm, { WorkoutTemplateFormValues } from "./WorkoutTemplateForm";


export default function WorkoutsGallery() {

    const [templates, setTemplates] = useState<WorkoutTemplateApiReturn | null>(null); 
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [templateToUpdate, setTemplateToUpdate] = useState<WorkoutTemplate | undefined>(undefined); 

    useEffect(() => {
        const fetchTemplates = async () => {
            const response = await fetchWorkoutTemplates(); 
            setTemplates(response); 
        }

        fetchTemplates(); 
    }, []); 

    const refreshTemplates = async () => {
        const response = await fetchWorkoutTemplates();
        setTemplateToUpdate(undefined);
        setTemplates(response);
    }

    const handleModalClose = async (formSubmitted?: boolean) => {
        setIsModalOpen(false); 
        formSubmitted && await refreshTemplates()
    } 

    const handleFormSubmit = async (formValues: WorkoutTemplateFormValues, add?: boolean) => {
        if(add) {
            await addWorkoutTemplate({
                name: formValues.name, 
                exercises: formValues.exercises
            } as Omit<WorkoutTemplate, 'id'>)
        } else {
            await updateWorkoutTemplate({
                id:  formValues.id,
                name: formValues.name, 
                exercises: formValues.exercises
            } as WorkoutTemplate); 
            setTemplateToUpdate(undefined); 
        } 

        handleModalClose(true); 
    }

    const handleEdit = (template: WorkoutTemplate) => {
        setTemplateToUpdate(template); 
        setIsModalOpen(true); 
    }

    const handleDelete = async (id: number) => {
        await deleteWorkoutTemplate(id); 
        await refreshTemplates(); 
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
                    <WorkoutTemplateForm initialData={templateToUpdate} handleSubmit={handleFormSubmit} />
                </Modal>
            }

            {templates?.data?.map((el, index) => (
                <WorkoutsGalleryItem key={el.id + index} workoutData={el} onEdit={handleEdit} onDelete={handleDelete}/>
            ))}
            <button
                className="btn-primary workout-template--add-btn"
                onClick={() => setIsModalOpen(true)}    
            >Dodaj szablon</button>
        </div>
    )
}