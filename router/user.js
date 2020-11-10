const express = require('express');
const mysql = require('./../dao/conn');
const crypto = require('crypto');
const router = express.Router();//生成路由

router.route('/')//设置访问目录
    .get(function (req, res, next) {
        let sql = `select * from user`;
        mysql.query(sql, (error, result) => {
            if (error) throw error;
            console.log(result);
        });
    });
//注册
router.route('/reg')//设置访问目录
    .post(function (req, res, next) {
        let user = req.body;
        let search = `select * from user where username='${user.username}'`;
        mysql.query(search, (error, result) => {
            if (error) console.log(error);
            if (result.length) {
                res.json({
                    msg: "用户已存在",
                    username: user.username,
                    error: 1
                });
            } else {
                var md5 = crypto.createHash('md5');   //crypto模块功能是加密并生成各种散列,此处所示为MD5方式加密
                var end_paw = md5.update(user.password).digest('hex');//加密后的密码
                let sql = `insert into user(username,password,iphone,address,email) 
                values('${user.username}','${end_paw}','${user.iphone}','${user.address}','${user.email}') `;
                mysql.query(sql, (error, result) => {
                    if (error) console.log(error);
                    if (result.insertId) {
                        res.json({
                            msg: "注册成功",
                            username: user.username,
                            error: 0
                        });
                    }
                });
            }
        });
    });
router.route('/login')
    .post(function (req, res, next) {
        let user = req.body;
        let md5 = crypto.createHash('md5');
        let end_pwd = md5.update(user.password).digest('hex');
        let sql = `select * from user where username='${user.username}' and password='${end_pwd}'`;

        mysql.query(sql, (error, result) => {
            if (error) throw error;
            if (!result.length) {
                res.json({ msg: '用户名或密码错误', isLogin: false, username: user.username });
            } else {
                res.json({ msg: '登录成功', isLogin: true, username: user.username });
            }
        });
    });
module.exports = router;
