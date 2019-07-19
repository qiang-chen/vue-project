const axios = require("axios")


//前端页面访问/getCarouselList  这个接口的时候会进入这里

//然后服务端进行代理 从这里发送ajax请求  然后向前端返回数据

module.exports.CarouselList = (req, res) => {
    //设置服务器代理从qq音乐获取数据
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?_=1562576005768&g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1';

    //获取用户发过来的身份令牌
    // let {
    //     token
    // } = req.query;
    // if (token) {
    //     //如果用户存在执行服务端axios代理发送请求
    //     axios.get(url, {
    //         //设置发送的请求头
    //         headers: {
    //             Origin: 'https://y.qq.com',
    //             Referer: 'https://y.qq.com'
    //         }
    //     }).then(result => {
    //         res.json({
    //             code: 1,
    //             data: result.data.data.slider
    //         })
    //     })

    // }else{
    //     //如果没有token令牌的话给用户返回一个401通知用户没有权限
    //     res.status(401)
    //     res.json({
    //         code:0,
    //         msg:"用户身份令牌失效"
    //     })
    // }

    //如果用户存在执行服务端axios代理发送请求
    axios.get(url, {
        //设置发送的请求头
        headers: {
            Origin: 'https://y.qq.com',
            Referer: 'https://y.qq.com'
        }
    }).then(result => {
        res.json({
            code: 1,
            data: result.data.data.slider
        })
    })

}

module.exports.RankList = (req, res) => {
    //设置服务器代理从qq音乐获取数据
    const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg?-=getUCGI6090116710013995&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22detail%22%3A%7B%22module%22%3A%22musicToplist.ToplistInfoServer%22%2C%22method%22%3A%22GetDetail%22%2C%22param%22%3A%7B%22topId%22%3A4%2C%22offset%22%3A0%2C%22num%22%3A20%2C%22period%22%3A%222019-07-08%22%7D%7D%2C%22comm%22%3A%7B%22ct%22%3A24%2C%22cv%22%3A0%7D%7D';
    axios.get(url, {
        //设置发送的请求头
        headers: {
            Origin: 'https://y.qq.com',
            Referer: 'https://y.qq.com'
        },

    }).then(result => {
        res.json({
            code: 1,
            data: result.data.detail.data.songInfoList
        })
    })
}
