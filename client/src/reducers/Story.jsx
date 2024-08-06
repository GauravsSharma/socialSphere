import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    message: null,
    followingStory:null,
    myStory:null,
    error: null,
};

export const storyReducer = createReducer(initialState, (builder) => {
    builder
        .addCase("ADD_STORY_REQUEST", (state) => {
            state.loading = true;
        })
        .addCase("ADD_STORY_SUCCESS", (state,action) => {
            state.loading = false;
            state.message = action.payload
        })
        .addCase("ADD_STORY_FAILURE", (state,action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("MY_STORY_REQUEST", (state) => {
            state.loading = true;
        })
        .addCase("MY_STORY_SUCCESS", (state,action) => {
            state.loading = false;
            state.myStory = action.payload;
        })
        .addCase("MY_STORY_FAILURE", (state,action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("FOLLOWING_STORY_REQUEST", (state) => {
            state.loading = true;
        })
        .addCase("FOLLOWING_STORY_SUCCESS", (state,action) => {
            state.loading = false;
            state.followingStory = action.payload;
        })
        .addCase("FOLLOWING_STORY_FAILURE", (state,action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase("CLEAR_STORY_MESSAGE",(state)=>{
            state.message = null
        })
        .addCase("CLEAR_STORY_ERROR",(state)=>{
            state.error = null
        })
})