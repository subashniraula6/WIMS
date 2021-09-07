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
export const addUser = (user) => async dispatch => {
    try {
        console.log(user)
        // check if token is present
        const token = localStorage.token;
        
        const headers = {
            'Authorization': `Bearer ${token}`
        }
        const data = JSON.stringify(user);
        const response = await axios.post('/api/admin/users', data, {headers});
        if(response.data.error){
            dispatch({
                type: 'ADD_USER_ERROR',
                payload: response.data.error
            })
            alert('add user success')
        } else {
            const user = response.data.result;
            console.log(user)
            dispatch({
                type: 'ADD_USER_SUCCESS',
                payload: user
            })
        }
        
    } catch (error) {
        console.log(error)
        dispatch({
            type: 'ADD_USER_ERROR',
            payload: error.reponse
        })
    }
}