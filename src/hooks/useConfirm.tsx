import Modal from "@/features/modal/components/Modal";
import { createContext, ReactNode, useContext, useState } from "react";
import { createPortal } from "react-dom";

interface ConfirmContextType {
  confirm: (message?: string) => Promise<boolean>; 
}


const ConfirmContext = createContext<ConfirmContextType | null>(null); 

interface ConfirmProviderProps {
  children: ReactNode;
}

export default function ConfirmProvider({ children }: ConfirmProviderProps) {

  const [isOpen, setIsOpen] = useState(false); 
  const [confirmMessage, setConfirmMessage] = useState<string>(''); 
  const [resolver, setResolver] = useState<((value: boolean) => void) | null>(null); 

  const confirm = (message: string = 'Czy potwierdzasz akcję?'): Promise<boolean> => {
    setIsOpen(true); 
    setConfirmMessage(message); 

    return new Promise((resolve) => {
      setResolver(() => resolve); 
    })
  }

  const onConfirm = () => {
    if(resolver) {
      resolver(true)
    }
    setIsOpen(false); 
    setResolver(null); 
  }
  const onCancel = () => {
    if(resolver) {
      resolver(false)
    }
    setIsOpen(false); 
    setResolver(null); 
  }

  const handleModalClose = () => {
    if(resolver){
      resolver(false)
    }
    setIsOpen(false); 
  }

  const value = {
    confirm
  }

  return (
    <ConfirmContext.Provider
      value={value}
    >
      {children}
      {
        createPortal((
          <Modal
            isOpen={isOpen}
            onClose={handleModalClose}
          >
            <div className="confirm_wrapper">
              <div className="confirm_message">
                {confirmMessage}
              </div>
              <div className="confirm_buttons">
                <button
                  className="confirm_buttons--confirm"
                  onClick={onConfirm}
                >
                  Potwierdź
                </button>
                <button
                  className="confirm_buttons--cancel"
                  onClick={onCancel}
                >
                  Anuluj
                </button>
              </div>
            </div>
          </Modal>
        ), document.getElementById('confirm-root') as Element)
      }
    </ConfirmContext.Provider>
  )
}

export const useConfirm = () => {
  const context = useContext(ConfirmContext);   
  if(!context) throw new Error('Context must be used within its provider'); 
  return context; 
}