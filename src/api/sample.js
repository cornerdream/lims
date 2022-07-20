import Axios from '../util/axios'

export const getTable = (data)=>{
    console.log(data)
    return Axios({
        method:'get',
        url:`/api/sample?limit=${data.limit}&offset=${data.offset}&filter=${JSON.stringify(data.filter)}&sort=${JSON.stringify(data.sort)}`,
        // url:`/api/sample`,
        data
    })
}
export const addTable = (data)=>{
    return Axios({
        method:'post',
        url:'/api/sample',
        data
    })
}
export const updateTable = (data)=>{
    return Axios({
        method:'put',
        url:'/api/sample',
        data
    })
}
export const deleteTable = (data)=>{
    return Axios({
        method:'delete',
        url:'/api/sample',
        data
    })
}