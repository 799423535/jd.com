const express=require('express');
const mysql=require('./../dao/conn');
const router=express.Router();//生成路由

router.route('/')//设置访问目录
.get(function(req,res,next){
    let sql=`select * from user`;
    mysql.query(sql,(error,result)=>{
        if(error)throw error;
        console.log(result);
    });
});

module.exports=router;
