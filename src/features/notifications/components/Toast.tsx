import { useEffect, useState } from "react";
import { ToastEntry } from "src/hooks/useToast";

export interface ToastProps extends ToastEntry {
  onClose: () => void; 
}

export default function Toast({
  id, 
  message, 
  type, 
  onClose, 
  stopAutoHide, 
  duration
}: ToastProps) {

  const [isPaused, setIsPaused] = useState(stopAutoHide ?? false); 
  const [isClosing, setIsClosing] = useState(false); 

  useEffect(() => {
    if(isPaused || isClosing) return; 
    const timer = setTimeout(() => {
      setIsClosing(true); 
    }, duration ?? 3000)

    return () => clearTimeout(timer); 
  },[id, isPaused, isClosing, duration])

  return (
      <div 
        className={`toast ${ type ? `toast_${type}` : ''} ${isClosing ? 'closing' : ''}`} 
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