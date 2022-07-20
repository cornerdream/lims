import Axios from '../util/axios'

export const getOrderChart = ()=>{
    return Axios({
        method:'get',
        url:'/api/order_chart'
    })
}