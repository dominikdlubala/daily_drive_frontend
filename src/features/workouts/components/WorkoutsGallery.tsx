import { useEffect, useState } from "react"
import WorkoutsGalleryItem from "./WorkoutsGalleryItem"
import { addWorkoutTemplate, deleteWorkoutTemplate, fetchWorkoutTemplates, updateWorkoutTemplate } from "../../../services/WorkoutTemplateService";
import { WorkoutTemplate } from "../../../types";
import Modal from "../../modal/components/Modal";
import WorkoutTemplateForm, { WorkoutTemplateFormValues } from "./WorkoutTemplateForm";
import { useAuth } from "../../../hooks/useAuth";


export default function WorkoutsGallery() {

    const { token } = useAuth(); 

    const [templates, setTemplates] = useState<WorkoutTemplate[] | null>(null); 
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [templateToUpdate, setTemplateToUpdate] = useState<WorkoutTemplate | undefined>(undefined); 

    useEffect(() => {
        const fetchTemplates = async () => {
            const { data, error } = await fetchWorkoutTemplates(token as string); 
            if(error) {
                console.error(error); 
            } else if(data) {
                setTemplates(data as WorkoutTemplate[]); 
            }
        }

        fetchTemplates(); 
    }, [token]); 

    const refreshTemplates = async () => {
        const { data, error } = await fetchWorkoutTemplates(token as string);
        setTemplateToUpdate(undefined);
        if(error) {
            console.error(error); 
        } else if(data) {
            setTemplates(data as WorkoutTemplate[]);
        }
    }

    const handleModalClose = async (formSubmitted?: boolean) => {
        setIsModalOpen(false); 
        formSubmitted && await refreshTemplates()
    } 

    const handleFormSubmit = async (formValues: WorkoutTemplateFormValues, add?: boolean) => {
        if(add) {
            const {data, error } = await addWorkoutTemplate(token as string, {
                name: formValues.name, 
                exercises: formValues.exercises
            } as Omit<WorkoutTemplate, 'id'>)
            if(error) {
            } else if (data) {
            }
        } else {
            const { data, error } = await updateWorkoutTemplate(token as string, {
                id:  formValues.id,
                name: formValues.name, 
                exercises: formValues.exercises
            } as WorkoutTemplate); 
            if(error) {
            } else if (data) {
                setTemplateToUpdate(undefined); 
            }
            
        } 

        handleModalClose(true); 
    }

    const handleAddClick = () => {
        setTemplateToUpdate(undefined); 
        setIsModalOpen(true);
    }

    const handleEdit = (template: WorkoutTemplate) => {
        setTemplateToUpdate(template); 
        setIsModalOpen(true); 
    }

    const handleDelete = async (id: number) => {
        const { error } = await deleteWorkoutTemplate(token as string, id);
        if(error) {
        } else {
            setTemplates(templates?.filter(el => el.id !== id) || null);
            await refreshTemplates(); 
        }
    }

    return (
        <>
            <div className="workout-page--head">
                <div className="page-title">Szablony treningowe</div>
                <button
                    className="workout-templ--add"
                    onClick={() => handleAddClick()}    
                >Dodaj szablon +</button>
            </div>
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

                {templates?.map((el, index) => (
                    <WorkoutsGalleryItem key={el.id + index} workoutData={el} onEdit={handleEdit} onDelete={handleDelete}/>
                ))}
            </div>
        </>
    )
}