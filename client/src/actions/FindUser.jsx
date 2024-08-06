import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/v1'

export const findUser = (query) => async (dispatch) => {
    try {
        dispatch({
            type: "FIND_USER_LOADING",
        });

        const token = JSON.parse(localStorage.getItem("token"));
        const { data } = await axios.post("/finduser", 
            { query }, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        dispatch({
            type: "FIND_USER_SUCCESS",
            payload: data.user,
        });
    } catch (error) {
        dispatch({
            type: "FIND_USER_FAILURE",
            payload: error.message,
        });
    }
};
