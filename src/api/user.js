import Axios  from "../util/axios";

export const login = (data)=>{
    console.log(data)
    const param = {
        user:data
    }
    return Axios({
        method:'post',
        url:'/api/users/login',
        data:param
    })
}

export const register = (data)=>{
    console.log(data)
    const param = {
        user:data
    }
    return Axios({
        method:'post',
        url:'/api/users',
        data:param
    })
}

export const getUser = (data)=>{
    console.log(data)
    return Axios({
        method:'get',
        url:'/api/user',
        data
    })
}

export const updateUser = (data)=>{
    console.log(data)
    return Axios({
        method:'put',
        url:'/api/user',
        data
    })
}

export const getCode = ()=>{
    return Axios({
        method:'get',
        url:'/api/code'
    })
}
