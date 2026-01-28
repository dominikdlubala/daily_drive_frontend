import { createPortal } from "react-dom";
import AddExerciseForm from "../../../exercise/components/AddExerciseForm";
import Modal from "../Modal";
import { ExerciseSearch2 } from "@/features/exercise/components/ExerciseSearch";
import { Control, Controller, FieldValues } from "react-hook-form";
import { ExerciseDefinition } from "@/types";

interface AddExerciseModalProps {
  isOpen: boolean; 
  onClose: () => void; 
  onExerciseSelect: (exercise: ExerciseDefinition) => void; 
}

export default function AddExerciseModal<T>({
  isOpen, 
  onClose, 
  onExerciseSelect, 
}: AddExerciseModalProps) {

  return (
    <>
      {
        createPortal((
          <Modal isOpen={isOpen} onClose={onClose}>
            <ExerciseSearch2 onExerciseSelect={(value: ExerciseDefinition) => {
              onExerciseSelect(value)
              onClose()
            }} />
          </Modal>
        ), document.getElementById('modal-root') as Element)
      }
    </>
  )   
}