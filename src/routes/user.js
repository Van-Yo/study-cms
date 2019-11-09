const express = require('express');
const router = express.Router();
const userModel = require('../dbs/models/userModel');
router.post('/register',(req,res)=>{
    let {us,ps} = req.body;
    if(us && ps){
        userModel.find({us})
        .then(msg=>{
            if(msg.length>0){
                res.send({code:-1,msg:'该用户名已被注册'});
            }else{
                console.log('准备去入库了');
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
router.get('/findAllUsers',(req,res)=>{
    userModel.find().then(msg=>{
        res.send(msg);
    })
})
module.exports = router