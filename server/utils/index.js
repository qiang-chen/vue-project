const md5 = require('md5');

const {whiteList} = require("../config/index.js")

module.exports.createToken = (uid) => {
    const token = JSON.stringify({
        iss: 'bwwz',
        uid: '1',
        tim: new Date().getTime()
    })
    return md5(token);
}

module.exports.requireAuth = (req, res, next) => {
    //console.log(req.headers)

    // whiteList.forEach(item => {
    //     //我们需要排除一下登录的请求
    //     if (req.path === item) {
    //         next();
    //         break;
    //     }
    // })

    const inList=whiteList.filter(item=>{
        return item===req.path
    })

    //判断当前路由是否在白名单存在
    if(inList.length) return next()

    const {
        authorization
    } = req.headers;
    if (authorization) {
        next()
    }else if(req.path.includes("/images/movie/")){
        next()
    } else {
        res.statusCode = 401;
        res.json({
            code: 0,
            msg: "没有权限访问"
        })
    }

}