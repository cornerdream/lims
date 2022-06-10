import {
    RESET_SIGNUP,
    SIGNIN,
    SIGNIN_SUCCESS,
    SIGNIN_FAIL
  } from "../actions/auth.actions"
  
  import {
    SIGNUP,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL
  } from "../actions/auth.actions"
  

  

  
  export const authReducer=(state={
    token:localStorage.getItem('token')||'',
    name:localStorage.getItem('name')||''
  },action)=> {
    console.log(state,action)
    return {
      ...state,
      ...action.data
    }
  }
  