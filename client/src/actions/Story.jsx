import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/v1'

export const addStory = (image, caption) => async (dispatch) => {
  try {
    dispatch({
      type: "ADD_STORY_REQUEST",
    })
    const token = JSON.parse(localStorage.getItem("token"))
    const { data } = await axios.post("/story/uploades", {
      caption,
      image
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    dispatch({
      type: "ADD_STORY_SUCCESS",
      payload: data.message
    })
  } catch (error) {
    dispatch({
      type: "ADD_STORY_FAILURE",
      payload: error.message
    })
  }
}
export const getMyStory = () => async (dispatch) => {
  try {
    dispatch({
      type: "MY_STORY_REQUEST",
    })
    const token = JSON.parse(localStorage.getItem("token"))
    const { data } = await axios.get("/story/adminstory", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    dispatch({
      type: "MY_STORY_SUCCESS",
      payload: data.story
    })
  } catch (error) {
    dispatch({
      type: "MY_STORY_FAILURE",
      payload: error.message
    })
  }
}
export const getFollowingStory = () => async (dispatch) => {
  try {
    dispatch({
      type: "FOLLOWING_STORY_REQUEST",
    })
    const token = JSON.parse(localStorage.getItem("token"))
    const { data } = await axios.get("/story/followingstory", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    dispatch({
      type: "FOLLOWING_STORY_SUCCESS",
      payload: data.stories
    })
  } catch (error) {
    dispatch({
      type: "FOLLOWING_STORY_FAILURE",
      payload: error.message
    })
  }
} 