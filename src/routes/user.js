const express = require('express');
const router = express.Router();
const userModel = require('../dbs/models/userModel');
/**
 * @api {post} /user/register 用户注册
 * @apiName register
 * @apiGroup User
 *
 * @apiParam {String} us 用户账号
 * @apiParam {String} ps 用户密码
 *
 * @apiSuccess {Number} code 0表示成功，-1表示失败
 * @apiSuccess {String} msg  
 */
router.post('/register',(req,res)=>{
    let {us,ps} = req.body;
    if(us && ps){
        userModel.find({us})
        .then(msg=>{
            if(msg.length>0){
                res.send({code:-1,msg:'该用户名已被注册'});
            }else{
                return userModel.insertMany({us,ps})
            }
        })
        .then(msg=>{
            res.send({code:0,msg:'注册成功'});
        })
        .catch(err=>{
            res.send(err);
        })
    }
})
/**
 * @api {get} /user/findAllUsers 用户查找
 * @apiName findAllUsers
 * @apiGroup User
 *
 * @apiSuccess {Number} code 0表示成功，-1表示失败
 * @apiSuccess {Array} msg  
 */
router.get('/findAllUsers',(req,res)=>{
    userModel.find().then(msg=>{
        res.send(msg);
    })
})
module.exports = router