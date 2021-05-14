import {combineReducers} from 'redux'
import authReducer from './authReducer'
import publicacionReducer from './publicacionReducer'

const mainReducer = combineReducers({
    publicacionReducer,
    authReducer,

})

export default mainReducer;