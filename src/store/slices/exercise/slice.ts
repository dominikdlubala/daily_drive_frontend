import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FaLessThanEqual } from "react-icons/fa";

type InitialExerciseSlice = {
  isExerciseModalOpen: boolean; 
}

const initialExerciseSlice = {
  isExerciseModalOpen: false
}

export const exerciseSlice = createSlice({
  name: 'exercise', 
  initialState: initialExerciseSlice, 
  reducers: {
    openExerciseModal(state) {
      state.isExerciseModalOpen = true; 
    }, 
    closeExerciseModal(state) {
      state.isExerciseModalOpen = false; 
    }
  }
})

export const {
  openExerciseModal, 
  closeExerciseModal
} = exerciseSlice.actions; 