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
    signup: {
      loaded: false,
      success: false,
      message: ""
    },
    signin: {
      loaded: false,
      success: false,
      message: ""
    }
  },action)=> {
    console.log(state,action)
    switch (action.type) {
      case SIGNUP:
        return {
          ...state,
          signup: {
            loaded: false,
            success: false
          }
        }
      case SIGNUP_SUCCESS:
        return {
          ...state,
          signup: {
            loaded: true,
            success: true,
          }
        }
      case SIGNUP_FAIL:
        return {
          ...state,
          signup: {
            loaded: true,
            success: false,
            message: action.message
          }
        }
      case RESET_SIGNUP:
        return {
          ...state,
          signup: {
            loaded: false,
            success: false,
            message: action.message
          }
        }
      case SIGNIN:
        return {
          ...state,
          signin: {
            loaded: false,
            success: false,
            data: action.data
          }
        }
      case SIGNIN_SUCCESS:
        return {
          ...state,
          signin: {
            loaded: true,
            success: true,
          }
        }
      case SIGNIN_FAIL:
        return {
          ...state,
          signin: {
            loaded: true,
            success: false,
            message: action.message
          }
        }
      default:
        return state
    }
  }
  