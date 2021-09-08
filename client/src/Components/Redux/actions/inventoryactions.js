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
export const addInventory = (inventory) => async dispatch => {
    try {
        console.log(inventory)
        // check if token is present
        const token = localStorage.token;
        
        const headers = {
            'Authorization': `Bearer ${token}`
        }
        const data = JSON.stringify(inventory);
        const response = await axios.post('/api/admin/inventories', data, {headers});
        if(response.data.error){
            dispatch({
                type: 'ADD_INVENTORY_ERROR',
                payload: response.data.error
            })
            alert('add inventory success')
        } else {
            const inventory = response.data.result;
            dispatch({
                type: 'ADD_INVENTORY_SUCCESS',
                payload: inventory
            })
        }
        
    } catch (error) {
        console.log(error)
        dispatch({
            type: 'ADD_INVENTORY_ERROR',
            payload: error.reponse
        })
    }
}
export const getInventory = (id) => async dispatch => {
    try {
        // check if token is present
        const token = localStorage.token;
      
        const headers = {
            'Authorization': `Bearer ${token}`
        }
        const response = await axios.get(`/api/inventories/${id}`, {headers});
        if(response.data.error){
            dispatch({
                type: 'GET_INVENTORY_ERROR',
                payload: response.data.error
            })
        } else {
            const inventories = response.data.result;
            dispatch({
                type: 'GET_INVENTORY_SUCCESS',
                payload: inventories
            })
        }
        
    } catch (error) {
        console.log(error)
        dispatch({
            type: 'GET_INVENTORY_ERROR',
            payload: error.reponse
        })
    }
}