/**
 * 注册
 */
 export const SIGNUP = "SIGNUP"
 export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS"
 export const SIGNUP_FAIL = "SIGNUP_FAIL"
 export const RESET_SIGNUP = "RESET_SIGNUP"

 export const signup = (data) => ({
    type: SIGNUP,
    data
  })
  
  export const signupSuccess = (data) => ({
    type: SIGNUP_SUCCESS,
    data
  })
  
  export const signupFail = (message) => ({
    type: SIGNUP_FAIL,
    message
  })
  
  export const resetSignup = () => ({
    type: RESET_SIGNUP
  })

/**
 * 登录
 */

 export const SIGNIN = "SIGNIN"
 export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS"
 export const SIGNIN_FAIL = "SIGNIN_FAIL"
 

export const signin = (data) => ({
  type: SIGNIN,
  data
})

 export const signinSuccess = (data) => ({
   type: SIGNIN_SUCCESS,
   data
 })
 
 export const signinFail = (message) => ({
   type: SIGNIN_FAIL,
   message
 })

 /**
 * 退出
 */

  export const SIGNOUT = "SIGNOUT"
  export const SIGNOUT_SUCCESS = "SIGNOUT_SUCCESS"
  export const SIGNOUT_FAIL = "SIGNOUT_FAIL"
  export const signout = (data) => ({
    type: SIGNOUT,
    data
  })
  export const signoutSuccess = (data) => ({
    type: SIGNOUT,
    data
  })
  export const signoutFail = (message) => ({
    type: SIGNOUT_FAIL,
    message
  })