import axios from '../../utils/axios'

export const fetchUsers = () => async dispatch => {
    try {
        // check if token is present
        const token = localStorage.token;
      
        const headers = {
            'Authorization': `Bearer ${token}`
        }
        const response = await axios.get('/api/admin/users', {headers});
        if(response.data.error){
            dispatch({
                type: 'GET_USERS_ERROR',
                payload: response.data.error
            })
        } else {
            const users = response.data.result;
            dispatch({
                type: 'GET_USERS_SUCCESS',
                payload: users
            })
        }
        
    } catch (error) {
        console.log(error)
        dispatch({
            type: 'GET_USERS_ERROR',
            payload: error.reponse
        })
    }
}