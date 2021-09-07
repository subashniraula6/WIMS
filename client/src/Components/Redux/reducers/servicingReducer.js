const INITIAL_STATE = {
    servicings: [],
    isLoading: true,
    error: {}
}

export default function servicingReducer(state=INITIAL_STATE, action){
    switch(action.type){
        case 'GET_SERVICINGS_SUCCESS':
            return {
                ...state,
                servicings: action.payload,
                isLoading:false
            }
        case 'GET_SERVICINGS_ERROR':
            return {
                ...state,
                error: action.payload,
                isLoading: false
            }
        default:
            return state;
    }
}