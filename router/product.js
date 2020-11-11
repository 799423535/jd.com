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

module.exports=router;