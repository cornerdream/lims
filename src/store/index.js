// import {configureStore} from '@reduxjs/toolkit'
import {applyMiddleware, legacy_createStore as createStore} from 'redux'

// import { authReducer } from './reducers/auth.reducers'
import createRootReducer from './reducers'
import {routerMiddleware} from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
// import { createHashHistory } from 'history'
import createHashHistory from 'history/createHashHistory.js'

export const history = createHashHistory()
// const createHistory = require('history').createHashHistory
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
    createRootReducer(history),
    composeWithDevTools(
        applyMiddleware(routerMiddleware(history),sagaMiddleware)
    )
)
// const store = createStore(
//     createRootReducer(history),
//     composeWithDevTools(
//         applyMiddleware(sagaMiddleware)
//     )
// )
// const store = createStore(createRootReducer, applyMiddleware(thunk))
// const store = createStore(createRootReducer, composeWithDevTools(applyMiddleware(thunk)))
// const store = createStore(createRootReducer())
sagaMiddleware.run(rootSaga)
export default store
