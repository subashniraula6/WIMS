import axios from '../../utils/axios'

export const getServicings = () => async dispatch => {
    try {
        const token = localStorage.getItem('token')
        if(token){
            const headers = {
                'Authorization': `Bearer ${token}`
            }
            const servicings = await axios.get('/api/admin/servicings', {headers})
            dispatch({
                type: 'GET_SERVICINGS_SUCCESS',
                payload: servicings.data.result
            })
        }
    } catch(err){
        dispatch({
            type: 'GET_SERVICINGS_ERROR',
            payload: err.response
        })
    }
}