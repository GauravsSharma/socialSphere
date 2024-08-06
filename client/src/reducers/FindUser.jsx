import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  user:null,
  error: null,
};

export const findUserReducer = createReducer(initialState, (builder) => {
   builder
   .addCase("FIND_USER_LOADING",(state)=>{
     state.loading = true
   })
   .addCase("FIND_USER_SUCCESS",(state,action)=>{
     state.loading = false;
     state.user = action.payload
   })
   .addCase("FIND_USER_FAILURE",(state,action)=>{
     state.loading = false,
     state.error = action.payload
   })
   .addCase("CLEAR_FIND_USER_ERR",(state)=>{
     state.error = null
   })
   .addCase("CLEAR_FIND_USER",(state)=>{
     state.user = null
   })
})