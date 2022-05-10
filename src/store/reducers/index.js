import {authReducer} from './auth.reducers'
import { combineReducers } from "redux"

const createRootReducer = () =>
  combineReducers({
    auth: authReducer
  })
export default createRootReducer