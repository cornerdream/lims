import Axios from '../util/axios'
export const getMenu = ()=>{
    return Axios({
        method:'get',
        url:'/api/menu'
    })
}