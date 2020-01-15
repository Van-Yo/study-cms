const express = require('express');
const router = express.Router();
const blogListModel = require('../dbs/models/blogListModel');
/**
 * @api {post} /blogList/addBlog 新增博客
 * @apiName addBlog
 * @apiGroup Blog
 *
 * @apiParam {String} title 标题 （必填）
 * @apiParam {Nunber} category 分类 （必填）
 * @apiParam {Nunber} hot 热度 （必填）
 * @apiParam {String} content 内容 （必填）
 * @apiParam {String} brief 简介 （非必填）
 * @apiParam {String} date 时间 （非必填）
 *
 * @apiSuccess {Number} code 0表示成功，-1表示失败
 * @apiSuccess {String} msg  信息
 */
router.post('/addBlog',(req,res)=>{
    let {title,category,hot,content,brief,date} = req.body;
    console.log(date)
    if(title && category && hot && content ){
        blogListModel.insertMany({title,category,hot,content,brief:brief||'暂无简介',date}).then(msg=>{
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
router.get('/getBlogList',(req,res)=>{
    blogListModel
    .find()
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
router.get('/blogDetail',(req,res)=>{
    let {_id} = req.query;
    console.log(_id)
    blogListModel
    .find(
        {_id}
    )
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
router.post('/updateBlog',(req,res)=>{
    let {_id,title,category,hot,content,brief,date} = req.body;
    if(_id && title && category && hot && content){
        blogListModel.update({_id},{title,category,hot,content,brief:brief||'暂无简介',date}).then(msg => {
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
router.get('/deleteBlog',(req,res)=>{
    let {_id} = req.query;
    blogListModel
    .deleteOne({_id})
    .then(msg=>{
        res.send({code:0,msg:'删除成功'})
    })
    .catch(err=>{
        res.send({code:-1,msg:'删除失败'})
    })
})
module.exports = router