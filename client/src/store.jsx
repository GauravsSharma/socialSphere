import {configureStore} from "@reduxjs/toolkit"
import { allUserReducer, userProfile, userReducer } from "./reducers/User"
import { postsReducer} from "./reducers/FollowingPost"
import { likeReducer } from "./reducers/Post"
import { storyReducer } from "./reducers/Story"
import { findUserReducer } from "./reducers/FindUser"

export const store = configureStore({
    reducer:{
        user:userReducer,
        postsReducer,
        allUsers:allUserReducer,
        likePost:likeReducer,
        userProfile,
        storyReducer,
        findUserReducer
    },
})