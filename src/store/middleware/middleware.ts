import { isFulfilled, isRejectedWithValue, Middleware } from "@reduxjs/toolkit"
import { AxiosError } from "axios";
import { sendNotificationEvent } from "src/features/notifications/notificationEvent";
import { ApiResponse } from "src/types";

export const toastMiddleware: Middleware = (api) => (next) => (action) => {
  if (isFulfilled(action)) {
    const { message, showNotification, stopAutoHide, duration } = action.payload as ApiResponse; 
    showNotification && sendNotificationEvent({ type: 'success', message, stopAutoHide, duration }); 

    return next(action); 
  }

  if(isRejectedWithValue(action)) {
    const { message, showNotification, stopAutoHide, duration } = action.payload as ApiResponse;  
    showNotification && sendNotificationEvent({ type: 'error', message, stopAutoHide, duration }); 
  }
  return next(action); 
}