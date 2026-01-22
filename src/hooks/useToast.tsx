import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Toast from "src/features/notifications/components/Toast";
import { onNotificationEvent } from "src/features/notifications/notificationEvent";

export type ToastType = 'success' | 'error' | 'info'; 

export interface ToastEntry {
  type: ToastType; 
  id: number; 
  message: string; 
  stopAutoHide?: boolean; 
  duration?: number; 
}

interface ToastContextType {
  notify: (toast: Omit<ToastEntry, 'id'>) => void; 
}

export const ToastContext = createContext<ToastContextType | null>(null); 

interface ToastProviderProps {
  children: ReactNode; 
}

export default function ToastProvider({ children }: ToastProviderProps) {
  const [notifications, setNotifications] = useState<ToastEntry[]>([]); 

  
  const notify = (toast: Omit<ToastEntry, 'id'>) => {
    setNotifications([
      ...notifications, 
      {
        id: notifications.length, 
        ...toast
      }
    ]); 
  }

  const removeToast = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  }


  useEffect(() => {
    const unsubscribe = onNotificationEvent((payload) => {
      notify(payload); 
    }); 

    return () => unsubscribe(); 
  }, [])

  const value = {
    notify
  }

  return (
    <ToastContext.Provider
      value={value}
    >
      {createPortal(
        <div className="toast-container">
          {
            notifications.map(({ id, message, type, stopAutoHide, duration }) => (
              <Toast
                key={id}
                id={id}
                message={message} 
                type={type}
                onClose={() => removeToast(id)}
                stopAutoHide={stopAutoHide}
                duration={duration}
              />
            ))
          }
        </div>, 
        document.getElementById('toast-root') as Element
      )}
      {children}
    </ToastContext.Provider>
  )

} 


export const useToast = () => {
  const toastContext = useContext(ToastContext); 

  if(!toastContext) throw new Error('Context must be used within its provider'); 

  return toastContext; 
}