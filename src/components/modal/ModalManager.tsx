import React, { ReactNode } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { closeTopModal } from "../../store";
import AddExerciseModal from "./components/exercise/AddExerciseModal";
import Modal from "./components/Modal";
import CreateExerciseModal from "./components/exercise/CreateExerciseModal";
import { createPortal } from "react-dom";

const MODAL_COMPONENTS: Record<string, React.FC<any>> = {
  ADD_EXERCISE: AddExerciseModal,
  CREATE_EXERCISE: CreateExerciseModal
}

export default function ModalManager() {

  const dispatch = useAppDispatch(); 
  const { stack } = useAppSelector(state => state.modal); 

  if(stack.length === 0) return null; 

  const close = () => dispatch(closeTopModal()); 

  return (
    <>
      {stack.map((entry, idx) => {
        const ModalComponent = MODAL_COMPONENTS[entry.type]; 
        const isTopModal = idx === stack.length - 1; 

        return createPortal(
          <Modal
            key={idx}
            isOpen={true}
            onClose={isTopModal ? () => close() : undefined}
            disableOverlayClick={!isTopModal}
            zIndex={1000 + idx}
          >
            <ModalComponent {...entry.props} />
          </Modal>,
          document.getElementById('modal-root') as Element
        )
      })}
    </>
  )
}