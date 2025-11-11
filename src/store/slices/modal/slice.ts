import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const ModalTypes = {
  ADD_EXERCISE: "ADD_EXERCISE", 
  CREATE_EXERCISE: "CREATE_EXERCISE"
} as const; 

export type ModalType = (typeof ModalTypes)[keyof typeof ModalTypes];

interface ModalEntry {
  type: ModalType; 
  props?: any; 
}

interface ModalState {
  stack: ModalEntry[]; 
}

const initialState: ModalState = {
  stack: []
}

const modalSlice = createSlice({
  name: 'modal', 
  initialState, 
  reducers: {
    openModal: (state, action: PayloadAction<ModalEntry>) => {
      state.stack.push({
        type: action.payload.type, 
        props: action.payload.props
      }); 
    }, 
    closeTopModal: (state) => {
      state.stack.pop(); 
    }, 
    closeAllModals: (state) => {
      state.stack = [];
    }, 
    closeModalByType: (state, action: PayloadAction<ModalType>) => {
      const typeToRemove = action.payload; 
      state.stack = state.stack.filter(modal => modal.type !== typeToRemove); 
    }
  }
})


export const { openModal, closeTopModal, closeAllModals, closeModalByType } = modalSlice.actions; 
export default modalSlice.reducer; 