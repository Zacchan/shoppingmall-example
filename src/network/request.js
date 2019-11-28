import axios from 'axios'

export function request(config){
    const instance = axios.create({
        baseURL:"http://106.54.54.237:8000/api/v1/",    //'http://123.207.32.32:8000'
        timeout:5000
    })

    // instance.interceptors.request.use(config=>{
    //     return config
    // },err=>{
    //     console.log("出现了"+err+"问题");
    // })

    instance.interceptors.response.use(result=>{
        return result.data
    },err=>{
        console.log(err);
    })

    return instance(config);    //直接instance(config).then(res=>) 这个res用了拦截器 所以是输出res.data
}