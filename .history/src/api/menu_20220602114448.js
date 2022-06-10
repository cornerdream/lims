import Axios from '../util/axios'
export const getMenu = (data)=>{
    return Axios({
        method:'post',
        url:'/api/menu',
        data
    })
}