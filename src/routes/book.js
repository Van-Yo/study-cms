const express = require('express');
const router = express.Router();
const bookModel = require('../dbs/models/bookModel');
router.post('/addBook',(req,res)=>{
    let {name,publicDate,price} = req.body;
    if(name && publicDate && price){
        bookModel.insertMany({name,publicDate,price}).then(msg=>{
            res.send({code:0,msg:'新增成功'});
        })
    }else{
        res.send({code:-1,msg:'新增失败'});
    }
})
router.get('/getBookList',(req,res)=>{
    bookModel.find().then(msg=>{
        res.send(msg)
    })
})
module.exports = router