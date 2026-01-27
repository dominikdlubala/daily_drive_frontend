import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const ModalTypes = {
  CREATE_EXERCISE: "CREATE_EXERCISE", 
  CREATE_EDIT_WORKOUT_TEMPLATE: "CREATE_EDIT_WORKOUT_TEMPLATE", 
  EXERCISE_SEARCH: 'EXERCISE_SEARCH'
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
    },
    checkOpenModals: (state) => {
      console.log(state.stack); 
    }
  }
})


export const { openModal, closeTopModal, closeAllModals, closeModalByType, checkOpenModals } = modalSlice.actions; 
export default modalSlice.reducer; 