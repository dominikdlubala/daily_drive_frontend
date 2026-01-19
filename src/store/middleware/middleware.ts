import { isFulfilled, isRejectedWithValue, Middleware } from "@reduxjs/toolkit"
import { ApiResponse } from "src/types";

export const toastMiddleware: Middleware = (api) => (next) => (action) => {
  if (isFulfilled(action)) {
    const { message, showNotification, autoHide } = action.payload as ApiResponse; 
    if(showNotification){
      // TO DO NOTIFICATION SYSTEM
      console.log(`success ${message}`)
    }

    return next(action); 
  }

  if(isRejectedWithValue(action)) {
    const { message, showNotification, autoHide } = action.payload as ApiResponse;  
    showNotification && console.error(`err: ${message}`); 
  }
  return next(action); 
}