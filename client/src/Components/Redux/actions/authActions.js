import axios from '../../utils/axios';

//Login User
export const loginUser = (userCredentials) => async dispatch => {

    const body = JSON.stringify(userCredentials);
    try {
        const res = await axios.post('/api/login', body);
        dispatch({
            type: 'LOGIN_SUCCESS',
            payload: res.data
        })
        
        dispatch(fetchCurrentUser());
       
    } catch (error) {
        dispatch({
            type: 'LOGIN_FAILURE'
        })
    }
}

export const fetchCurrentUser = () => async dispatch => {
    try {
        // check if token is present
        const token = localStorage.token;
      
        const headers = {
            'Authorization': `Bearer ${token}`
        }
        const userResponse = await axios.get('/api/me', {headers});
        const user = userResponse.data.user;
        dispatch({
            type: 'USER_LOADED',
            payload: user
        })
        
    } catch (error) {
        console.log(error)
        dispatch({
            type: 'AUTH_ERROR'
        })
    }
}

export const logoutUser = () => async dispatch => {
    try{
        //clear inventories, requests
        dispatch({
            type: 'LOGOUT_SUCCESS'
        })
    } catch(error) {
        dispatch({
            type: 'LOGOUT_FAILURE'
        })
    }
}