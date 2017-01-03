"use strict"

const express = require('express');
const path = require('path');
const router = require('./router');
const config = require("./config");


//通过调用express() 得到一个app实例
const app = express();

//一般对于一个规范的项目来说，模板文件就放在views下，第一个views不能改变，否则无效
app.set('views', path.join(__dirname, 'views'));
//设置使用ejs模板引擎，第一个参数view engine 不能改变，否则无效
app.set('view engine', 'ejs');

//设置静态资源处理中间件，第一个参数表示虚拟路径，第二个参数表示设置到那个目录做为静态资源存储位置
app.use("/www", express.static("www"));
app.use(express.static("photos"));







//给app.locals挂载一个属性，config方便我们在后面的处理中直接通过req.locals.config来使用
app.use(function(req, res, next) {
    //app.locals.config = config;  //因为只有photoDir用到；而这样后面调用还要.rootDir，太长了显得
    app.locals.photoDir = config.photoDir;
    next();
});


//挂载路由中间件
app.use(router);

//配置错误处理中间件  测试的时候debug设置为true，上线了设置为false
//一般把这个错误处理中间件放到中间件的最后位置
if (config.debug) {
    app.use(function(err, req, res, next) {
        res.send(err.message);
    });
}


app.listen(3000, '127.0.0.1', function() {
    console.log("listening 3000");
})