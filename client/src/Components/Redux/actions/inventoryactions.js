import axios from "../../utils/axios";

export const getInventories = () => async dispatch => {
    try {
        // check if token is present
        const token = localStorage.token;
      
        const headers = {
            'Authorization': `Bearer ${token}`
        }
        const response = await axios.get('/api/admin/inventories', {headers});
        if(response.data.error){
            dispatch({
                type: 'GET_INVENTORIES_ERROR',
                payload: response.data.error
            })
        } else {
            const inventories = response.data.result;
            dispatch({
                type: 'GET_ADMIN_INVENTORIES_SUCCESS',
                payload: inventories
            })
        }
        
    } catch (error) {
        console.log(error)
        dispatch({
            type: 'GET_INVENTORIES_ERROR',
            payload: error.reponse
        })
    }
}