import {combineReducers} from 'redux'
import authReducer from './authReducer';
import userReducer from './userReducer';
import inventoryReducer from './inventoryReducer';
import servicingReducer from './servicingReducer';

export default combineReducers({authReducer, userReducer, inventoryReducer, servicingReducer});
