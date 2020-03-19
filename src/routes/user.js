const express = require('express');
const router = express.Router();
const userModel = require('../dbs/models/userModel');
const Mail = require('../utils/mail.js');
let registerCodeObj = {};
let resetPsCodeObj = {};
/**
 * @api {post} /user/vertiCode 获取注册验证码
 * @apiName vertiCode
 * @apiGroup User
 *
 * @apiParam {String} us 邮箱
 *
 * @apiSuccess {Number} code 0表示成功，-1表示失败
 * @apiSuccess {String} msg  信息
 */
router.post('/vertiCode',(req,res)=>{
    let {us} = req.body;
    let code = Math.random().toFixed(6).slice(-6);
    Mail.mailToAddress(us,code)
    .then(msg=>{
        if(msg){
            registerCodeObj[us] = code;
            res.send({code:0,msg:'发送成功'});
        }
    })
    .catch(err=>{
        res.send({code:-1,msg:'发送失败'});
    })
})
/**
 * @api {post} /user/register 用户注册
 * @apiName register
 * @apiGroup User
 *
 * @apiParam {String} us 用户账号
 * @apiParam {String} ps 用户密码
 * @apiParam {String} code 验证码
 *
 * @apiSuccess {Number} code 0表示成功，-1表示失败
 * @apiSuccess {String} msg  信息
 */
router.post('/register',(req,res)=>{
    let {us,ps,code} = req.body;
    if(us && ps && code){
        if (registerCodeObj[us] == code) {
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
        }else{
            res.send({code:-1,msg:'验证码错误'});
        }
    }
})
/**
 * @api {post} /user/login 用户登录
 * @apiName login
 * @apiGroup User
 *
 * @apiParam {String} us 用户账号
 * @apiParam {String} ps 用户密码
 *
 * @apiSuccess {Number} code 0表示成功，-1表示失败
 * @apiSuccess {String} msg  信息
 */
router.post('/login',(req,res)=>{
    let {us,ps} = req.body;
    userModel.find({us,ps}).then(msg=>{
        if(msg && msg.length>0){
            req.session.user=msg[0];
            req.session.save();
            res.send({code:0,msg:'ok',data:msg});
        }else{
            res.send({code:-1,msg:'no'});
        }
    })
    // const user={
    //     name:"Chen-xy",
    //     age:"22",
    //     address:"bj"
    //    }
    //    req.session.user=user;
    //    res.send({code:0,msg:'已经设置好session'});
})
/**
 * @api {get} /user/logout 用户登录
 *
 * @apiSuccess {Number} code 0表示成功，-1表示失败
 * @apiSuccess {String} msg  信息
 */
router.get('/logout',(req,res)=>{
    req.session.user = null; // 删除session
    if(req.session.user == null){
        res.send({code:0,msg:'ok'});
    }else{
        res.send({code:-1,msg:'no'});
    }
    
})
/**
 * @api {post} /user/resetCode 获取重置密码验证码
 * @apiName resetCode
 * @apiGroup User
 *
 * @apiParam {String} us 邮箱
 *
 * @apiSuccess {Number} code 0表示成功，-1表示失败
 * @apiSuccess {String} msg  
 */
router.post('/resetCode',(req,res)=>{
    let {us} = req.body;
    let code = Math.random().toFixed(6).slice(-6);
    userModel.find({us})
    .then(msg=>{
        if(msg && msg.length>0){
            return Mail.mailToAddress(us,code);
        }else{
            res.send({code:-1,msg:'该用户尚未注册'});
        }
    })
    .then(msg=>{
        if(msg){
            resetPsCodeObj[us] = code;
            res.send({code:0,msg:'发送成功'});
        }
    })
    .catch(err=>{
        res.send({code:-1,msg:'发送失败'});
    })
})
/**
 * @api {post} /user/resetPassword 修改密码
 * @apiName resetPassword
 * @apiGroup User
 *
 * @apiParam {String} us 用户账号
 * @apiParam {String} ps 用户密码
 * @apiParam {String} code 验证码
 *
 * @apiSuccess {Number} code 0表示成功，-1表示失败
 * @apiSuccess {String} msg  信息
 */
router.post('/resetPassword',(req,res)=>{
    let {us,ps,code} = req.body;
    if(us && ps && code==resetPsCodeObj[us]){
        userModel.updateOne({us},{ps}).then(msg=>{
            if(msg.nModified==1){
                res.send({code:0,msg:'修改成功'});
            }else{
                res.send({code:-1,msg:'修改失败'});
            }
        })
    }else{
        res.send({code:-1,msg:'用户名或者密码或者验证码错误'})
    }
})
/**
 * @api {get} /user/findAllUsers 用户查找
 * @apiName findAllUsers
 * @apiGroup User
 *
 * @apiSuccess {Number} code 0表示成功，-1表示失败
 * @apiSuccess {Array} msg  数据信息
 */
router.get('/findAllUsers',(req,res)=>{
    userModel.find().then(msg=>{
        res.send(msg);
    })
})
module.exports = router