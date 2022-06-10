// import {configureStore} from '@reduxjs/toolkit'
import {legacy_createStore as createStore} from 'redux'

// import { authReducer } from './reducers/auth.reducers'
import createRootReducer from './reducers/index'


const store = createStore(createRootReducer())

export default store
