const express = require('express');
const router = express.Router();
const bookModel = require('../dbs/models/bookModel');
/**
 * @api {post} /book/addBook 新增书籍
 * @apiName addBook
 * @apiGroup Book
 *
 * @apiParam {String} name 书名
 * @apiParam {String} publicDate 出版时间
 * @apiParam {String} price 价格
 * @apiParam {String} category 分类：1文学,2数学,3英语
 * @apiParam {String} number 数量
 *
 * @apiSuccess {Number} code 0表示成功，-1表示失败
 * @apiSuccess {String} msg  信息
 */
router.post('/addBook',(req,res)=>{
    let {name,publicDate,price,category,number} = req.body;
    if(name && publicDate && price && category && number){
        bookModel.insertMany({name,publicDate,price,category,number}).then(msg=>{
            res.send({code:0,msg:'新增成功'});
        })
    }else{
        res.send({code:-1,msg:'新增失败'});
    }
})
/**
 * @api {get} /book/getBookList 书籍列表
 * @apiName getBookList
 * @apiGroup Book
 *
 * @apiSuccess {Array} msg  数据信息
 */
router.get('/getBookList',(req,res)=>{
    bookModel
    .find()
    .then(msg=>{
        res.send(msg)
    })
})
router.get('/getBookPanel',(req,res)=>{
    let {nowPage,listNumber} = req.query;
    console.log( {nowPage,listNumber} );
    bookModel
    .find()
    .skip(parseInt(nowPage)*parseInt(listNumber))
    .limit(parseInt(listNumber))
    .then(msg=>{
        res.send(msg)
    })
})
module.exports = router