const express=require('express');
const path=require('path');
const createError=require('http-errors');
const cookieParser = require('cookie-parser');//导入cookie的插件
const userRouter=require('./router/user');
const productRouter=require('./router/product');
let conf={//配置详情
    port:8888,
    host:'localhost'
};
const app=express();//启动应用
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser());//设置cookie
app.use(express.static(path.join(__dirname,'public')));//设置静态目录

//------router---------------------
//用户
app.use('/user',userRouter);
//商品
app.use('/product',productRouter);

//------router---------------------

//--------------404-----------
app.use(function(req,res,next){
    next(createError(404));
});
app.use(function(error,req,res,next){
     res.status(error.status||500);
     res.redirect('/html/404.html');
});

//--------------404-----------
app.listen(conf.port,conf.host,()=>{//服务启动
   console.log(`server start to  ${conf.host}:${conf.port}`);
});