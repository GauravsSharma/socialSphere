import axios from 'axios';

axios.defaults.baseURL = 'https://social-sphere-mu.vercel.app/api/v1'

export const getFollowingPosts = () => async(dispatch)=>{
   try {
      dispatch({
        type:"POST_OF_FOLLOWING_REQUEST",
      })
      const token = JSON.parse(localStorage.getItem("token"))
      const {data} = await axios.get("/followingpost",{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      dispatch({
        type:"POST_OF_FOLLOWING_SUCCESS",
        payload:data.posts
      })
   } catch (error) {
       dispatch({
        type:"POST_OF_FOLLOWING_FAILURE",
        payload:error.message
       })
   }
}
export const getMyPosts = () => async(dispatch)=>{
  try {
      dispatch({
          type:"MY_POSTS_REQUEST",
      }) 
      const token = JSON.parse(localStorage.getItem("token"))
      const {data} = await axios.get(`/accounts/getmyposts`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      dispatch({
          type:"MY_POSTS_SUCCESS",
          payload:data.posts
      }) 
    } catch (error) {
      dispatch({
          type:"MY_POSTS_FAILURE",
          payload:error.message
      })
    }
}
export const getUserProfilePosts = (userId) => async(dispatch)=>{
  try {
      dispatch({
          type:"USER_PROFILE_POST_REQUEST",
      }) 
      const token = JSON.parse(localStorage.getItem("token"))
      const {data} = await axios.get(`/accounts/getuserposts/${userId}`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      dispatch({
          type:"USER_PROFILE_POST_SUCCESS",
          payload:data.posts
      }) 
    } catch (error) {
      dispatch({
          type:"USER_PROFILE_POST_FAILURE",
          payload:error.message
      })
    }
}
