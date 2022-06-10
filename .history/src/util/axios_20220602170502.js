import Axios from 'axios'
import {message} from 'antd'


// Axios.defaults.baseURL = import.meta.env.VITE_APP_BASEAPI
// Axios.defaults.baseURL = process.env.VITE_APP_BASEAPI
Axios.defaults.baseURL = 'http://192.168.1.203:8888'
// const redirectLogin = function redirectLogin(){
//     this.props.navigate(`/signin`, { replace: true })
// }
// Axios.defaults.timeout = 50000

Axios.defaults.withCredentials = true

let noTokenUrl = [
    '/'
]

let exportUrl = '/export'
let uploadUrl = '/upload'

let statusCode = {
    400:'请求参数错误',
    401:'权限不足，请重新登录',
    403:'服务器拒绝本次访问',
    404:'请求资源未找到',
    500:'服务器内部错误',
    501:'服务器不支持该请求中使用的方法',
    502:'网关错误',
    504:'网关超时'
}

Axios.interceptors.request.use(config=>{
    console.log(config)
    // config.headers.Authorization = localStorage.getItem('token') || ''
    if(noTokenUrl.indexOf(config.url)<0){
        console.log('111')
        let token = localStorage.getItem("token")||''
        // token && (config.headers.Authorization = token)
        token && (config.headers.Authorization = 'Bearer '+token)
    }else{
        config.headers.Authorization = ''
    }
    // let token = localStorage.getItem("token")||''
    // config.headers.Authorization = ('Bearer '+token)||''
    if(config.url.includes(exportUrl)){
        config.headers['responseType'] = 'blob'
    }
    if(config.url.includes(uploadUrl)){
        config.headers['Content-Type'] = 'multipart/form-data'
    }
    console.log(config)
    return config
},error=>{
    return Promise.reject(error)
})

Axios.defaults.validateStatus = status =>{
    return /^(2|3)\d{2}$/.test(status)
}

Axios.interceptors.response.use(response=>{
    console.log(response)
    // return response
    if(response.statusText == 'OK'){
        return Promise.resolve(response.data)
    }else{
        message.error('响应超时')
        return Promise.reject(response.data.message)
    }
},async error=>{
    console.log(error)
    const {response} = error
    if(response){
        const {status} = response
        let tips = status in statusCode ? statusCode[status] : error.message
        message.error(tips)
        if(status==401){
            this.props.navigate('/signin',{replace:true})
        }
        return Promise.reject(error)
    }else{
        message.error('请求超时，请刷新重试')
        return Promise.reject('请求超时，请刷新重试')
    }
})

export default Axios