import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/v1'

export const registerUser = (name,email,password,avatar) => async(dispatch)=>{
  try {
    dispatch({
        type:"REGISTER_REQUEST",
    }) 
    const {data} = await axios.post("/register",{name,email,password,avatar},{
        headers:{
            "Content-type":"application/json"
        }
    })
    localStorage.setItem("token",JSON.stringify(data.token))
    dispatch({
        type:"REGISTER_SUCCESS",
        payload:data.user
    }) 
  } catch (error) {
    dispatch({
        type:"REGISTER_FAILURE",
        payload:error.message
    })
  }
}
export const loginUser = (email,password) => async(dispatch)=>{
  try {
    dispatch({
        type:"LOGIN_REQUEST",
    }) 
    const {data} = await axios.post("/login",{email,password},{
        headers:{
            "Content-type":"application/json"
        }
    })
    localStorage.setItem("token",JSON.stringify(data.token))
    dispatch({
        type:"LOGIN_SUCCESS",
        payload:data.user
    }) 
  } catch (error) {
    dispatch({
        type:"LOGIN_FAILURE",
        payload:error.message
    })
  }
}
export const loadUser = () => async(dispatch)=>{
  try {
    dispatch({
        type:"LOADUSER_REQUEST",
    }) 
    const token = JSON.parse(localStorage.getItem("token"))

    const {data} = await axios.get("/userprofile",{
      headers: {
        Authorization:`Bearer ${token}`
      }
    })
    dispatch({
        type:"LOADUSER_SUCCESS",
        payload:data.user
    }) 
  } catch (error) {
    dispatch({
        type:"LOADUSER_FAILURE",
        payload:error.message
    })
  }
}
export const getAllUsers = () => async(dispatch)=>{
  try {
    dispatch({
        type:"ALL_USER_REQUEST",
    }) 
    const token = JSON.parse(localStorage.getItem("token"))
    const {data} = await axios.get("/getallusers",{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    dispatch({
        type:"ALL_USER_SUCCESS",
        payload:data.users
    }) 
  } catch (error) {
    dispatch({
        type:"ALL_USER_FAILURE",
        payload:error.message
    })
  }
}
export const getUser = (userId) => async(dispatch)=>{
  try {
      dispatch({
          type:"USER_REQUEST",
      }) 
      const token = JSON.parse(localStorage.getItem("token"))
      const {data} = await axios.get(`/userprofile/${userId}`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      dispatch({
          type:"USER_SUCCESS",
          payload:data.user
      }) 
    } catch (error) {
      dispatch({
          type:"USER_FAILURE",
          payload:error.message
      })
    }
}
export const updateProfile = (name,email,avatar) => async(dispatch)=>{
  try {
    if(avatar.startsWith("https")){
      avatar = null
    }
    dispatch({
        type:"UPDATE_PROFILE_REQUEST",
    }) 
    const token = JSON.parse(localStorage.getItem("token"))
    const {data} = await axios.put("/update/profile",{name,email,avatar},{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    dispatch({
        type:"UPDATE_PROFILE_SUCCESS",
        payload:data.message
    }) 
  } catch (error) {
    dispatch({
        type:"UPDATE_PROFILE_FAILURE",
        payload:error.message
    })
  }  
}
