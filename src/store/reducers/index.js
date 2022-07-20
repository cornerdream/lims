import {authReducer} from './auth.reducers'
import { combineReducers } from "redux"
import { connectRouter } from 'connected-react-router';
const createRootReducer = (history) =>
  combineReducers({
    auth: authReducer
  })
export default createRootReducer