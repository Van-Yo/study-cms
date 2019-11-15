const express = require('express');
const router = express.Router();
const bookModel = require('../dbs/models/bookModel');
/**
 * @api {post} /book/addBook 新增书籍
 * @apiName addBook
 * @apiGroup Book
 *
 * @apiParam {String} name 书名 （必填）
 * @apiParam {String} publicDate 出版时间 （必填）
 * @apiParam {String} price 价格 （必填）
 * @apiParam {Number} category 分类：1文学,2数学,3英语 （必填）
 * @apiParam {Number} number 数量 （必填）
 * @apiParam {String} author 作者 （必填）
 * @apiParam {String} brief 简介 （非必填）
 * @apiParam {String} date 时间 （非必填）
 *
 * @apiSuccess {Number} code 0表示成功，-1表示失败
 * @apiSuccess {String} msg  信息
 */
router.post('/addBook',(req,res)=>{
    let {name,publicDate,price,category,number,author,brief,date} = req.body;
    console.log(brief);
    if(name && publicDate && price && category && number && author){
        bookModel.insertMany({name,publicDate,price,category,number,author,brief:brief||'暂无简介',date}).then(msg=>{
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
/**
 * @api {get} /book/getBookPanel 分页书籍列表
 * @apiName getBookPanel
 * @apiGroup Book
 *
 * @apiParam {String} nowPage 当前页 （非必填，默认0）
 * @apiParam {String} listNumber 每页条数 （非必填，默认10）
 * 
 * @apiSuccess {Array} msg  数据信息
 */
router.get('/getBookPanel',(req,res)=>{
    let {nowPage,listNumber} = req.query;
    bookModel
    .find()
    .skip((parseInt(nowPage) || 0)*parseInt(listNumber))
    .limit(parseInt(listNumber) || 10)
    .then(msg=>{
        res.send(msg)
    })
})
/**
 * @api {get} /book/findBook 书籍模糊查询
 * @apiName findBook
 * @apiGroup Book
 *
 * @apiParam {String} searchString 查询关键词 （必填）
 * 
 * @apiSuccess {Array} msg  数据信息
 */
router.get('/findBook',(req,res)=>{
    let {searchString} = req.query;
    bookModel
    .find(
        {
            $or : [ //多条件，数组
                {name : {$regex: searchString}},
                {author : {$regex : searchString}},
                {brief : {$regex : searchString}}
            ]
        }
    )
    .then(msg=>{
        res.send(msg)
    })
})
/**
 * @api {post} /book/updateBook 更改书籍信息
 * @apiName updateBook
 * @apiGroup Book
 *
 * @apiParam {String} _id _id （必填）
 * @apiParam {String} name 书名 （必填）
 * @apiParam {String} publicDate 出版时间 （必填）
 * @apiParam {String} price 价格 （必填）
 * @apiParam {Number} category 分类：1文学,2数学,3英语 （必填）
 * @apiParam {Number} number 数量 （必填）
 * @apiParam {String} author 作者 （必填）
 * @apiParam {String} brief 简介 （非必填）
 * @apiParam {String} date 时间 （非必填）
 *
 * @apiSuccess {Number} code 0表示成功，-1表示失败
 * @apiSuccess {String} msg  信息
 */
router.post('/updateBook',(req,res)=>{
    let {_id,name,publicDate,price,category,number,author,brief,date} = req.body;
    if(_id && name && publicDate && price && category && number && author){
        bookModel.update({_id},{name,publicDate,price,category,number,author,brief:brief||'暂无简介',date}).then(msg => {
            res.send({code:0,msg:'更新成功'});
        })
    }else{
        res.send({code:-1,msg:'更新失败'});
    }
})
/**
 * @api {get} /book/deleteBook 删除书籍
 * @apiName deleteBook
 * @apiGroup Book
 *
 * @apiParam {String} _id 书籍id （必填）
 * 
 * @apiSuccess {Array} msg  数据信息
 */
router.get('/deleteBook',(req,res)=>{
    let {_id} = req.query;
    bookModel
    .deleteOne({_id})
    .then(msg=>{
        res.send({code:0,msg:'删除成功'})
    })
    .catch(err=>{
        res.send({code:-1,msg:'删除失败'})
    })
})
module.exports = router