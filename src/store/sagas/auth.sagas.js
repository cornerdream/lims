import {put,takeEvery} from 'redux-saga/effects'
import { SIGNIN,signinSuccess,signinFail,SIGNOUT,signoutSuccess,signoutFail,SIGNUP,signupSuccess,signupFail } from '../actions/auth.actions'

import {login,register} from '../../api/user'


function* handleSignup(action){
    console.log(action)
    try{
        // yield register(action.payload)
        let res = yield register(action.data)
        console.log(res)
        localStorage.setItem('token',res.token)
        localStorage.setItem('name',res.name)
        yield put(signupSuccess(action.data))
    }catch(error){
        console.log(error)
        // yield put(signupFail(error.response.data.error))
        yield put(signupFail(error.response.data.errors[0].msg))
    }
}

function* handleSignin(action){
    console.log(action)
    try{
        let res = yield login(action.data)
        console.log(res)
        localStorage.setItem('token',res.token)
        localStorage.setItem('name',res.name)
        yield put(signinSuccess(action.data))
    }catch(error){
        console.log(error)
        // yield put(signinFail(error.response.data.error))
        yield put(signinFail(error.response.data.errors[0].msg))
    }
}
function* handleSignout(action){
    console.log(action)
    try{
        // localStorage.clear()
        localStorage.setItem('token','')
        localStorage.setItem('name','')
        // yield put(signoutSuccess(action.data))
    }catch(error){
        console.log(error)
        // yield put(signinFail(error.response.data.error))
        yield put(signoutFail(error.response.data.errors[0].msg))
    }
}
export default function* authSaga(){
    yield takeEvery(SIGNUP,handleSignup)
    yield takeEvery(SIGNIN,handleSignin)
    yield takeEvery(SIGNOUT,handleSignout)
}