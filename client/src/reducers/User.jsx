import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  user: null,
  error: null,
  isAuthenticated:false
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LOGIN_REQUEST", (state) => {
      state.loading = true;
    })
    .addCase("LOGIN_SUCCESS", (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    })
    .addCase("LOGIN_FAILURE", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })
    .addCase("REGISTER_REQUEST", (state) => {
      state.loading = true;
    })
    .addCase("REGISTER_SUCCESS", (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    })
    .addCase("REGISTER_FAILURE", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = FaLaptopHouse;
    })
    .addCase("LOADUSER_REQUEST", (state) => {
      state.loading = true;
    })
    .addCase("LOADUSER_SUCCESS", (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    })
    .addCase("LOADUSER_FAILURE", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })
    .addCase("CLEAR_USER", (state, action) => {
      state.user = null;
      state.isAuthenticated = false
    })
});
export const allUserReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("ALL_USER_REQUEST", (state) => {
      state.loading = true;
    })
    .addCase("ALL_USER_SUCCESS", (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    })
    .addCase("ALL_USER_FAILURE", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })
    .addCase("CLEAR_ERROR",(state)=>{
      state.error = null
    })
});
export const userProfile = createReducer(initialState, (builder) => {
  builder
  .addCase("USER_REQUEST", (state) => {
    state.loading = true;
  }) 
  .addCase("USER_SUCCESS", (state,action) => {
    state.loading = false;
    state.user = action.payload
  }) 
  .addCase("USER_FAILURE", (state,action) => {
    state.loading = false;
    state.error = action.payload
  }) 
})
