import { useEffect, useRef } from 'react'; 
import type { ReactNode } from 'react'; 
import { createPortal } from "react-dom"

interface ModalProps {
    children: ReactNode; 
    isOpen: boolean; 
    onClose: () => void; 
}

export default function Modal({ children, isOpen, onClose }: ModalProps) {

    const modalRef = useRef<HTMLDivElement | null>(null); 

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if(modalRef.current && !modalRef.current.contains(e.target as Node)) {
                onClose(); 
            }
        } 
        
        if(isOpen) document.addEventListener('mousedown', handleClickOutside); 

        return () => document.removeEventListener('mousedown', handleClickOutside); 
    }, [isOpen, onClose]); 

    return createPortal(
        <div className="modal-background">
            <div ref={modalRef} onClick={(e) => e.stopPropagation()} className="modal-content">
                {children}
            </div>
        </div>, 
        document.querySelector('.modal-container') as Element
    )
}