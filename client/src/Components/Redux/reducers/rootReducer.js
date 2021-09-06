import {combineReducers} from 'redux'
import authReducer from './authReducer';
import userReducer from './userReducer';
import inventoryReducer from './inventoryReducer';

export default combineReducers({authReducer, userReducer, inventoryReducer});
