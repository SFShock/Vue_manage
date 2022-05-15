import axios from 'axios'//在这里对axios进行封装
import config from '../config'
//将配置文件与axios结合，根据当前是工作环境还是生产环境，把地址进行变化
const baseUrl =process.env.NODE_ENV === 'development'?config.baseUrl.dev:config.baseUrl.pro

class HttpRequest{
    constructor(baseUrl){
        this.baseUrl=baseUrl;
    }
    getInsideConfig(){//axios相关配置
        const config={
            baseUrl:this.baseUrl,
            header:{}
        }
        return config;
    }
    interceptors(instance){
        instance.interceptors.request.use(function(config){
            return config;
        },function(error){
            return Promise.reject(error);
        });
        instance.interceptors.response.use(function(response){
            console.log(response,'response')
            return response;
        },function(error){
            console.log(error,'error')
            return Promise.reject(error);
        });
    }
    request(options){
        const instance=axios.create()
        options={...this.getInsideConfig(),...options}
        this.interceptors(instance)
        return instance(options)
    }
}

export default new HttpRequest(baseUrl)