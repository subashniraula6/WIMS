const INITIAl_STATE = {
    users: [],
    user: null,
    isLoading: true,
    error: {}
}

export default function userReducer(state=INITIAl_STATE, action){
    switch(action.type){
        case 'GET_USERS_SUCCESS':
            return {
                ...state,
                users: action.payload,
                isLoading: false
            }
        case 'GET_USER_SUCCESS':
            return {
                ...state,
                user: action.payload,
                isLoading: false
            }
        case 'GET_USERS_ERROR':
            return {
                ...state,
                error: action.payload,
                isLoading: false
            }
        case 'ADD_USER_SUCCESS':
            return {
                ...state,
                users: [...state.users, action.payload],
                isLoading: false,
            }
        case 'REMOVE_USER_SUCCESS':
        case 'REVIVE_USER_SUCCESS':
            return {
                ...state,
                users: state.users.map(user => {
                    if(user.id === action.payload.id){
                        user.status = action.payload.status;
                        user.leftAt = action.payload.leftAt;
                    }
                    return user;
                })
            }
        case 'UPDATE_USER_SUCCESS':
            return {
                ...state,
                users: state.users.map(user => {
                    if(user.id === action.payload.id){
                        user = action.payload;
                    }
                    return user;
                })
            }          
        default:
            return {...state}
    }
}