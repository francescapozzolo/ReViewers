import {combineReducers} from 'redux'
import authReducer from './authReducer'
import publicacionReducer from './publicacionReducer'
import sideBarReducer from './sideBarReducer'

const mainReducer = combineReducers({
    publicacionReducer,
    authReducer,
    sideBarReducer
})
export default mainReducer;