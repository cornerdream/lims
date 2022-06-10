import Axios from '../util/axios'
export const getMenu = ()=>{
    return Axios({
        method:'post',
        url:'/api/menu'
    })
}