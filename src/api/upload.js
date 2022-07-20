import Axios from '../util/axios'
export const upload = (data)=>{
    return Axios({
        method:'post',
        url:'/api/upload',
        headers:{'Content-Type':'multipart/form-data'},
        data
    })
}