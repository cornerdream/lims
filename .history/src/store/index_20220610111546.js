// import {configureStore} from '@reduxjs/toolkit'
import {applyMiddleware, legacy_createStore as createStore} from 'redux'

// import { authReducer } from './reducers/auth.reducers'
import createRootReducer from './reducers/index'
import {routerMiddleware} from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'
import { composeWithDevTools } from 'redux-devtools-extension'

import { createHashHistory } from 'history'

export const history = createHashHistory()
// const sagaMiddleware = createSagaMiddleware()
// const store = createStore(
//     createRootReducer(history),
//     composeWithDevTools(
//         applyMiddleware(routerMiddleware(history),sagaMiddleware)
//     )
// )
const store = createStore(
    createRootReducer(history),
    applyMiddleware(routerMiddleware(history))
)
// sagaMiddleware.run(rootSaga)
export default store
