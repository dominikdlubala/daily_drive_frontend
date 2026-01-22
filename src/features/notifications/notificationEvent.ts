import { ToastEntry, ToastType } from "src/hooks/useToast";

const eventTarget = new EventTarget(); 

type ToastPayload = Omit<ToastEntry, 'id'>; 

export const sendNotificationEvent = ({ type, message, stopAutoHide, duration }: ToastPayload) => {
  const event = new CustomEvent<ToastPayload>('show-notification', {
    detail: { type, message, stopAutoHide, duration }
  }); 
  eventTarget.dispatchEvent(event); 
}

export const onNotificationEvent = (callback: (payload: ToastPayload) => void) => {
  const handler = (e: Event) => {
    const customEvent = e as CustomEvent<ToastPayload>; 
    if(customEvent.detail) {
      callback(customEvent.detail); 
    }
  }; 
  eventTarget.addEventListener('show-notification', handler); 

  return () => eventTarget.removeEventListener('show-notification', handler); 
}