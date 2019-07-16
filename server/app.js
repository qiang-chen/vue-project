var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const {requireAuth}=require("./utils/index.js")



//废弃了
//var servers=require("./service/index.js")(app)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//挂载全局的拦截器

//这样挂载上以后只要我走接口都会执行这个函数 和下面那个写在/上面的道理是一样的
app.use(requireAuth)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//这里可以用一个中间件拦截一下网络请求  如果没有了token 直接给前端
//返回401 告诉其没有权限登录  //但是这样写会有一个问题 那就是不管什么接口都被拦截了
//包括登录请求也被拦截住了  这样就与我们的目的不同了
//但是我们可以通过req.path获取到请求的地址 然后将登录的接口排除在外
// app.use('/',(req,res,next)=>{
//   console.log(req.path)
//   //但是我们不能通过params传参了  就不能使用req.query.token获取token了

//   //而是通过axios的请求前拦截统一让headers进行发送 所以下面应该成headersheaders获取
//   const token=req.headers.token;
//   console.log(token,"获取到的headers头部的token")
//   if(req.path==="/user/login"){
//     next();
//     return;
//   }
//   if(token){
//     console.log("进来了吗")
//     next()
//   }else{
//     res.status(401).json({
//       code:0,
//       msg:"用户未登录"
//     })
//   }
  
// }, indexRouter);

app.use('/',indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
