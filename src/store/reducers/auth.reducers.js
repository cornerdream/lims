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
  import {
    SIGNOUT,
    SIGNOUT_SUCCESS,
    SIGNOUT_FAIL
  } from "../actions/auth.actions"

  const intialState = {
    signup: {
      name:'',
      // password:'',
    },
    signin: {
      token:'',
      name:''
    }
  }
  export const authReducer=(
    state = intialState,
    // state,
    action
  )=> {
    console.log(state,action)
    switch (action.type) {
      case SIGNUP:
        return {
          // ...state.signup,
          // ...action.data
          // loaded: false,
          // name:action.data.name,
          success: false
         
        }
      case SIGNUP_SUCCESS:
        return {
          
          // ...state.signup,
          // ...action.data
            // loaded: true,
            name:action.data.name,
            success: true
          
        }
      case SIGNUP_FAIL:
        return {
          
          // ...state.signup,
            // loaded: true,
            success: false,
            message: action.message

        }
      case RESET_SIGNUP:
        return {
          // ...state.signup,
            // loaded: false,
            success: false,
            message: ""

        }
      case SIGNIN:
        return {
          // ...state.signin,
          // ...action.data,
            loaded: false,
            name:action.data.name,
            // success: false,
            // message: ""

        }
      case SIGNIN_SUCCESS:
        return {

          // ...state.signin,
          // ...action.data
            // loaded: true,
            name:action.data.name,
            success: true,
            // message: ""

        }
      case SIGNIN_FAIL:
        return {

          // ...state.signin,
            // loaded: true,
            success: false,
            message: action.message

        }
      case SIGNOUT:
        return {
          // ...state.signin,
          // ...action.data
            loaded: false,
            // name:action.data.name,
            // success: false,
            message: "退出成功"

        }
      case SIGNOUT_SUCCESS:
        return {
          name:action.data.name,
          success: true,
        }
      case SIGNOUT_FAIL:
        return {

          // ...state.signin,
            // loaded: true,
            success: false,
            message: action.message

        }
      default:
        return state
    }
  }
  
  // export const authReducer=(state={
  //   // token:localStorage.getItem('token')||'',
  //   name:localStorage.getItem('name')||'',
  //   password:localStorage.getItem('password')||''
  // },action)=> {
  //   console.log(state,action)
  //   return {
  //     ...state,
  //     ...action.data
  //   }
  // }
  