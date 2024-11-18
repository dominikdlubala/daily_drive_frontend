import type { ReactNode } from 'react'; 
import { createPortal } from "react-dom"

interface ModalProps {
    children: ReactNode
}

export default function Modal({ children }: ModalProps) {

    return createPortal(
        <div className="modal-background">
            {children}
        </div>, 
        document.querySelector('.modal-container') as Element
    )
}