import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export interface ToastProps {
  id: number; 
  message: string; 
  type?: string;
  onClose: () => void; 
}

export default function Toast({
  id, 
  message, 
  type, 
  onClose
}: ToastProps) {

  const [isPaused, setIsPaused] = useState(false); 
  const [isClosing, setIsClosing] = useState(false); 

  useEffect(() => {
    if(isPaused || isClosing) return; 
    const timer = setTimeout(() => {
      setIsClosing(true); 
    }, 3500)

    return () => clearTimeout(timer); 
  },[id, isPaused, isClosing])

  return (
      <div 
        className={`toast ${ type ? `toast-${type}` : ''} ${isClosing ? 'closing' : ''}`} 
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}

        onAnimationEnd={() => {
          if(isClosing) onClose(); 
        }}
      >
        <span>{ message }</span>
        <button
          className="toast_close-btn"
          onClick={() => setIsClosing(true)}
        >
          x
        </button>
      </div>
    )
}