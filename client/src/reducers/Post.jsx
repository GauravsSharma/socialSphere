import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  message: null,
  error: null,
};

export const likeReducer = createReducer(initialState, (builder) => {
    builder
    .addCase("LIKE_REQUEST", (state) => {
      state.loading = true;
    }) 
    .addCase("LIKE_SUCCESS", (state,action) => {
      state.loading = false;
      state.message = action.payload
    }) 
    .addCase("LIKE_FAILURE", (state,action) => {
      state.loading = false;
      state.error = action.payload
    }) 
    .addCase("COMMENT_POST_REQUEST", (state) => {
      state.loading = true;
    }) 
    .addCase("COMMENT_POST_SUCCESS", (state,action) => {
      state.loading = false;
      state.message = action.payload
    }) 
    .addCase("COMMENT_POST_FAILURE", (state,action) => {
      state.loading = false;
      state.error = action.payload
    }) 
    .addCase("DELETE_COMMENT_REQUEST", (state) => {
      state.loading = true;
    }) 
    .addCase("DELETE_COMMENT_SUCCESS", (state,action) => {
      state.loading = false;
      state.message = action.payload
    }) 
    .addCase("DELETE_COMMENT_FAILURE", (state,action) => {
      state.loading = false;
      state.error = action.payload
    }) 
    .addCase("CLEAR_ERROR", (state) => {
      state.error = null;
    }) 
    .addCase("CLEAR_MESSAGE", (state) => {
      state.message = null;
    }) 
    .addCase("UPLOAD_POST_REQUEST", (state) => {
      state.loading = true;
    }) 
    .addCase("UPLOAD_POST_SUCCESS", (state,action) => {
      state.loading = false;
      state.message = action.payload
    }) 
    .addCase("UPLOAD_POST_FAILURE", (state,action) => {
      state.loading = false;
      state.error = action.payload
    }) 
    .addCase("DELETE_POST_REQUEST", (state) => {
      state.loading = true;
    }) 
    .addCase("DELETE_POST_SUCCESS", (state,action) => {
      state.loading = false;
      state.message = action.payload
    }) 
    .addCase("DELETE_POST_FAILURE", (state,action) => {
      state.loading = false;
      state.error = action.payload
    }) 
    .addCase("LOGOUT_REQUEST", (state) => {
      state.loading = true;
    }) 
    .addCase("LOGOUT_SUCCESS", (state,action) => {
      state.loading = false;
      state.message = action.payload
    }) 
    .addCase("LOGOUT_FAILURE", (state,action) => {
      state.loading = false;
      state.error = action.payload
    }) 
    .addCase("FOLLOW_USER_REQUEST", (state) => {
      state.loading = true;
    }) 
    .addCase("FOLLOW_USER_SUCCESS", (state,action) => {
      state.loading = false;
      state.message = action.payload
    }) 
    .addCase("FOLLOW_USER_FAILURE", (state,action) => {
      state.loading = false;
      state.error = action.payload
    }) 
    .addCase("UPDATE_PROFILE_REQUEST", (state) => {
      state.loading = true;
    }) 
    .addCase("UPDATE_PROFILE_SUCCESS", (state,action) => {
      state.loading = false;
      state.message = action.payload
    }) 
    .addCase("UPDATE_PROFILE_FAILURE", (state,action) => {
      state.loading = false;
      state.error = action.payload
    }) 
    .addCase("FORGOT_PASSWORD_REQUEST", (state) => {
      state.loading = true;
    }) 
    .addCase("FORGOT_PASSWORD_SUCCESS", (state,action) => {
      state.loading = false;
      state.message = action.payload
    }) 
    .addCase("FORGOT_PASSWORD_FAILURE", (state,action) => {
      state.loading = false;
      state.error = action.payload
    }) 
    .addCase("RESET_PASSWORD_REQUEST", (state) => {
      state.loading = true;
    }) 
    .addCase("RESET_PASSWORD_SUCCESS", (state,action) => {
      state.loading = false;
      state.message = action.payload
    }) 
    .addCase("RESET_PASSWORD_FAILURE", (state,action) => {
      state.loading = false;
      state.error = action.payload
    }) 
})
