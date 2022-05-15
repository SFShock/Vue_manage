import axios from './axios'//使用封装好的axios
// 接口请求方法
export const getMenu=(param)=>{
    return axios.request({
        url:'/permission/getMenu',
        method:'post',
        data:param
    })
}

export const getData=()=>{
    return axios.request({
        url:'/home/getData',
        method:'get'
    })
}