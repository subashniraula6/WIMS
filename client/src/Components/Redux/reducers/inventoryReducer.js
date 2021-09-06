const INITIAl_STATE = {
    adminInventories: [],
    userinventories: [],
    inventory: null,
    isLoading: true,
    error: {}
}

export default function inventoryReducer(state=INITIAl_STATE, action){
    switch(action.type){
        case 'GET_ADMIN_INVENTORIES_SUCCESS':
            return {
                ...state,
                adminInventories: action.payload,
                isLoading: false
            }
        case 'GET_USER_INVENTORIES_SUCCESS':
            return {
                ...state,
                userInventories: action.payload,
                isLoading: false
            }
        case 'GET_INVENTORY_SUCCESS':
            return {
                ...state,
                inventory: action.payload,
                isLoading: false
            }
        case 'GET_INVENTORIES_ERROR':
        case 'GET_INVENTORIES_ERROR':
            return {
                ...state,
                error: action.payload,
                isLoading: false
            }
        case 'ADD_INVENTORY_SUCCESS':
            return {
                ...state,
                adminInventories: [...state.adminInventories, action.payload],
                isLoading: false,
            }
        case 'DISPOSE_INVENTORY_SUCCESS':
        case 'REVIVE_INVENTORY_SUCCESS':
            return {
                ...state,
                adminInventories: state.adminInventories.map(inventory => {
                    if(inventory.id === action.payload.id){
                        inventory = action.payload
                    }
                    return inventory;
                })
            }
        case 'UPDATE_INVENTORY_SUCCESS':
            return {
                ...state,
                adminInventories: state.adminInventories.map(inventory => {
                    if(inventory.id === action.payload.id){
                        inventory = action.payload;
                    }
                    return inventory;
                })
            }          
        default:
            return {...state}
    }
}