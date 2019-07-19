//设置一个白名单 用来判断哪些请求不需要获取请求头之中token
//可以直接发起请求

module.exports.whiteList=[
    "/user/login",
    "/user/registry"
]