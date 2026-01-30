import { useEffect, useRef } from 'react'; 
import type { ReactNode } from 'react'; 
import { createPortal } from "react-dom"

interface ModalProps {
    children: ReactNode; 
    isOpen: boolean; 
    onClose?: () => void; 
    disableOverlayClick?: boolean; 
    zIndex?: number; 
}

export default function Modal({ children, isOpen, onClose, disableOverlayClick, zIndex = 1000 }: ModalProps) {

    useEffect(() => {
        if(!isOpen || !onClose) return; 

        const handleEsc = (e: KeyboardEvent) => {
            if(e.key === 'Escape') onClose(); 
        }
        if(isOpen) {
            document.addEventListener('keydown', handleEsc)
        }

        return () => {
            document.removeEventListener('keydown', handleEsc); 
        }
    }, [isOpen, onClose])

    if(!isOpen) return null; 

    return (
        <div 
            className="modal-background" 
            onClick={!disableOverlayClick && onClose ? onClose : undefined}
            style={{zIndex}}
        >
            <div
                className="modal-content" 
                onClick={(e) => e.stopPropagation()}
                style={{zIndex: zIndex + 1}}
                role="dialog"
                aria-modal="true"
            >
                {children}
            </div>
        </div> 
    )
}