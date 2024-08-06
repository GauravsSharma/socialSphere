import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/v1'

export const likePost = (id) => async(dispatch)=>{
    try {
        dispatch({
            type:"LIKE_REQUEST",
        }) 
        const token = JSON.parse(localStorage.getItem("token"))
        const {data} = await axios.get(`/post/${id}`,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        dispatch({
            type:"LIKE_SUCCESS",
            payload:data.message
        }) 
      } catch (error) {
        dispatch({
            type:"LIKE_FAILURE",
            payload:error.message
        })
      }
}
export const commentPost = (id,comment) => async(dispatch)=>{
    try {
        dispatch({
            type:"COMMENT_POST_EQUEST",
        }) 
        const token = JSON.parse(localStorage.getItem("token"))
        const {data} = await axios.put(`/post/comment/${id}`,{
          comment
        },{
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":"application/json"
          }
        })
        dispatch({
            type:"COMMENT_POST_SUCCESS",
            payload:data.message
        }) 
      } catch (error) {
        dispatch({
            type:"COMMENT_POST_FAILURE",
            payload:error.message
        })
      }
}
export const deleteComment = (postId,commentId) => async(dispatch)=>{
    try {
        dispatch({
            type:"DELETE_COMMENT_REQUEST",
        }) 
        const token = JSON.parse(localStorage.getItem("token"))
        console.log(token);
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          data: {
            commentId
          }
        };
        const {data} = await axios.delete(`/post/comment/${postId}`,config)
        dispatch({
            type:"DELETE_COMMENT_SUCCESS",
            payload:data.message
        }) 
      } catch (error) {
        dispatch({
            type:"DELETE_COMMENT_FAILURE",
            payload:error.message
        })
      }
}
export const uploadPost = (image,caption) => async(dispatch)=>{
  try {
      dispatch({
          type:"UPLOAD_POST_REQUEST",
      }) 
      const token = JSON.parse(localStorage.getItem("token"))
      const {data} = await axios.post(`/post/uploads`,{
        image,
        caption
      },{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      dispatch({
          type:"UPLOAD_POST_SUCCESS",
          payload:data.message
      }) 
    } catch (error) {
      dispatch({
          type:"UPLOAD_POST_FAILURE",
          payload:error.message
      })
    }
}
export const deletePost = (postId) => async(dispatch)=>{
  try {
      dispatch({
          type:"DELETE_POST_REQUEST",
      }) 
      const token = JSON.parse(localStorage.getItem("token"))
      // console.log(token);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      };
      const {data} = await axios.delete(`/post/${postId}`,config)
      dispatch({
          type:"DELETE_POST_SUCCESS",
          payload:data.message
      }) 
    } catch (error) {
      dispatch({
          type:"DELETE_POST_FAILURE",
          payload:error.message
      })
    }
}
export const logout = () => async(dispatch)=>{
  try {
      dispatch({
          type:"LOGOUT_REQUEST",
      }) 
      const token = JSON.parse(localStorage.getItem("token"))
      const {data} = await axios.get(`/logout`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      localStorage.removeItem("token")
      dispatch({
          type:"LOGOUT_SUCCESS",
          payload:data.message
      }) 
      dispatch({
          type:"CLEAR_USER",
      }) 
    } catch (error) {
      dispatch({
          type:"LOGOUT_FAILURE",
          payload:error.message
      })
    }
}
export const followUser = (userId) => async(dispatch)=>{
  try {
      dispatch({
          type:"FOLLOW_USER_REQUEST",
      }) 
      const token = JSON.parse(localStorage.getItem("token"))
      const {data} = await axios.get(`/follow/${userId}`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      dispatch({
          type:"FOLLOW_USER_SUCCESS",
          payload:data.message
      })  
    } catch (error) {
      dispatch({
          type:"FOLLOW_USER_FAILURE",
          payload:error.message
      })
    }
}
export const forgotPassword = (email) => async(dispatch)=>{
  try {
      dispatch({
          type:"FORGOT_PASSWORD_REQUEST",
      }) 
      const token = JSON.parse(localStorage.getItem("token"))
      const {data} = await axios.post(`/forgot/reset/password`,{
        email
      },{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      dispatch({
          type:"FORGOT_PASSWORD_SUCCESS",
          payload:data.message
      })  
    } catch (error) {
      dispatch({
          type:"FORGOT_PASSWORD_FAILURE",
          payload:error.message
      })
    }
}
export const resetPassword = (token,password) => async(dispatch)=>{
  try {
      dispatch({
          type:"RESET_PASSWORD_REQUEST",
      }) 
      const {data} = await axios.put(`/password/reset/${token}`,{
        password
      },{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      dispatch({
          type:"RESET_PASSWORD_SUCCESS",
          payload:data.message
      })  
    } catch (error) {
      dispatch({
          type:"RESET_PASSWORD_FAILURE",
          payload:error.message
      })
    }
}