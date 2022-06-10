import {put,takeEvery} from 'redux-saga/effects'
import { SIGNUP,signupSuccess,signupFail } from '../actions/auth.actions'
import Axios from 'axios'
import {login} from '../../api/user'
import baseUrl from '../../util/baseUrl'
import {SIGNIN,signinSuccess,signinFail} from '../actions/auth.actions'

function* handleSignup(action){
    try{
        yield login(action.payload)
        yield put(signupSuccess())
    }catch(error){
        yield put(signupFail(error.response.data.error))
    }
}

function* handleSignin(action){
    try{
        let res = yield login(action.data)
        console.log(res)
        localStorage.setItem('token',JSON.stringify(res.token))
        localStorage.setItem('name',JSON.stringify(res.name))
        yield put(signinSuccess(res))
    }catch(error){
        yield put(signinFail(error.response.data.error))
    }
}

export default function* authSaga(){
    // yield takeEvery(SIGNUP,handleSignup)
    yield takeEvery(SIGNIN,handleSignin)
}