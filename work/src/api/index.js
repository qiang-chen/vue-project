//网络请求文件

//引入登录请求接口
import {login} from "./port/port"

//封装一个登录请求

export function Login(content){
    return fetch(login,{
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(content)
    }).then(res=>res.json())
}