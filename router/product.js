const express=require('express');
const mysql=require('./../dao/conn');
const router=express.Router();

router.route('/')
.get((req,res,next)=>{
     let sql=`select * from product`;
     mysql.query(sql,(err,result)=>{
          if(err)console.log(err);
          res.json(result);
     });
});
router.route('/getProduct')
.get((req,res,next)=>{
     let sql=`select * from product where pid=${req.query.pid}`;
     mysql.query(sql,(err,result)=>{
          if(err)console.log(err);
          res.json(result);
     });
});
router.route('/getItems')
.get((req,res,next)=>{
     if(req.query.str){
     let sql=`select * from product where pid in (${req.query.str})`;
     mysql.query(sql,(err,result)=>{
          if(err)console.log(err);       
          res.json(result);
     });
  }
});
//获取信息（模糊查询）
router.route('/getMes')
.get((req,res,next)=>{
     let mes=req.query.mes;
     let sql=`
     select * from product where pname like '%${mes}%' or title like '%${mes}%' or sub like '%${mes}%' or details like '%${mes}%' order by pid`;
     mysql.query(sql,(err,results)=>{
          if(err)console.log(err);
          res.json(results);
     });
});
module.exports=router;