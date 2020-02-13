import axios from 'axios'

import {Toast} from 'vant' //可以在手机上显示像android那样的toast

import qs from "qs" //将url中的参数转为对象；

                    //将对象转为url参数形式       


const   Url = "http://106.54.54.237:8000/api/hy",
        Url1 = "http://106.54.54.237:8000/api/w1",
        Url2="http://123.207.32.32:8000/api/w2",
        Url3="http://106.54.54.237:8000/api/v1"

export function request(config){
    const _axios = axios.create({
        baseURL:Url||Url1||Url2||Url3,    //'http://123.207.32.32:8000'http://106.54.54.237:8000/api/v1/
        timeout:5000
    })
  

    // instance.interceptors.request.use(config=>{
    //     return config
    // },err=>{
    //     console.log("出现了"+err+"问题");
    // })

    _axios.interceptors.request.use(result=>{
       Toast.loading({
            forbidClick:true,
            message:"loading...."
        });
        Toast.success({
            message:"loading successfully"
        })
      
        return result;
    },err=>{
        console.log(err);
    })

    //响应拦截
    _axios.interceptors.response.use(res=>{
         Toast.clear();
        return res.data;
    },
err=>{
   Toast.clear();
    return Promise.reject(err);
})
    return _axios(config);    //直接instance(config).then(res=>) 这个res用了拦截器 所以是输出res.data
}