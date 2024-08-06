import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  posts: [],
  error: null,
};

export const postsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("POST_OF_FOLLOWING_REQUEST", (state) => {
      state.loading = true;
    })
    .addCase("POST_OF_FOLLOWING_SUCCESS", (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    })
    .addCase("POST_OF_FOLLOWING_FAILURE", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("MY_POSTS_REQUEST", (state) => {
      state.loading = true;
    })
    .addCase("MY_POSTS_SUCCESS", (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    })
    .addCase("MY_POSTS_FAILURE", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("USER_PROFILE_POST_REQUEST", (state) => {
      state.loading = true;
    })
    .addCase("USER_PROFILE_POST_SUCCESS", (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    })
    .addCase("USER_PROFILE_POST_FAILURE", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("CLEAR_ERRORS", (state) => {
      state.error = null;
    });
});
