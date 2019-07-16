//网络请求文件

import axios from "axios"

//引入登录请求接口
import {login,registry} from "./port/port"

//引入轮播接口

import {lunbo} from './port/port';

//引入音乐列表接口

import {rank,movie,len}  from "./port/port"


//引入获取token的函数封装

import {getCookeies} from "@/utils/cookie"

//引入我们封装好的axios拦截 然后让其统一管理每个接口的状态
//第一 判断是不是开发环境 然后决定要不要加api前缀
//第二 判断哪些接口需要加token令牌 然后统一在请求前的header字段加上token字段

import request from "@/utils/request"

//封装一个登录请求
export function Login(content){
    // return fetch(login,{
    //     method: 'post',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(content)
    // }).then(res=>res.json())
    return request.post(login,content)
}


//封装一个注册请求的函数

export function Registry(data){
  return request.post(registry,data)
}




//封装一个获取qq音乐轮播图的函数

//在获取这个轮播数据列表的时候将token这个令牌返给后端
//让后端根据这个身份令牌来区别是什么人从而给我们返回不一样的数据

export function getCarouselList(){

  //这样通过params给后端发送令牌就太麻烦了 而且post请求还不能这样发
  //所以此时就引进了我们axios的拦截了  

  // return axios.get(lunbo,{
  //   params:{
  //     token:getCookeies()||$store.state.login.token
  //   }
  // });

  return request.get(lunbo);

}

//封装一个获取音乐列表数据的函数

export function getRankList(){
  return request.get(rank)
}

//电影列表
export function getMovieList(params){
  //console.log(params)
  //注意这里的params是对象
  return request.get(movie,{params})
}


//电影列表的长度

export function getMovieLength(){
  return request.get(len)
}
