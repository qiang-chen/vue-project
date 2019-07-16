var express = require('express');
var router = express.Router();

const bodyParser = require("body-parser")
const {
  Api,
  Login,
  Registry,
} = require("../controller/user.js")


const {CarouselList,RankList}=require("../controller/home.js")
const {MovieList,MovieLength}=require("../controller/movie.js")


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});


router.get("/api",Api)
router.post("/user/login", bodyParser.urlencoded({ extended: false }), Login)

//用户注册接口

router.post("/user/registry",bodyParser.urlencoded({ extended: false }),Registry)

//获取轮播图数据
//其实这里就是访问这个/getCarouselList接口  由我们服务器自己设置的接口
//然后执行后面CarouselList这个函数
//这个函数在routers下面的index里面为我们设置了一波服务端代理 用来连接真实的qq音乐服务器接口
router.get("/getCarouselList",CarouselList)

//获取推荐榜数据  同样用服务器代理模式

router.get("/getRankList",RankList)

//写一个电影列表接口

router.get("/getMovieList",MovieList)


//写一个获取电影列表长度的接口

router.get("/getMovieLength",MovieLength)



module.exports = router;