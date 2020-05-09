const express = require('express');
const router = express.Router();
const categoryModel = require('../dbs/models/categoryModel');
const checkLogin  = require('../middlewares/checklogin');

// router.use(logMiddleware);
// router.use(checkLogin);
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
router.post('/addCategory',(req,res)=>{
    let {name,id,imgSrc} = req.body;
    if(name && id && imgSrc){
        categoryModel.insertMany({name,id,imgSrc}).then(msg=>{
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
router.get('/getCategoryList',(req,res)=>{
    categoryModel
    .find()
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
router.post('/updateCategory',(req,res)=>{
    let {_id,name,id,imgSrc} = req.body;
    if(_id && name && id && imgSrc){
        categoryModel.update({_id},{name,id,imgSrc}).then(msg => {
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
router.get('/deleteCategory',(req,res)=>{
    let {_id} = req.query;
    categoryModel
    .deleteOne({_id})
    .then(msg=>{
        res.send({code:0,msg:'删除成功'})
    })
    .catch(err=>{
        res.send({code:-1,msg:'删除失败'})
    })
})
module.exports = router