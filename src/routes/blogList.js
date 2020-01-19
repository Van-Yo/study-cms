const express = require('express');
const router = express.Router();
const blogListModel = require('../dbs/models/blogListModel');
const moment = require('moment');
/**
 * @api {post} /blogList/addBlog 新增博客
 * @apiName addBlog
 * @apiGroup Blog
 *
 * @apiParam {String} title 标题 （必填）
 * @apiParam {String} category 分类 （必填）
 * @apiParam {Number} hot 热度 （必填）
 * @apiParam {String} content 内容 （必填）
 * @apiParam {Number} status 状态 （必填）
 * @apiParam {String} brief 简介 （非必填）
 * @apiParam {String} date 时间 （非必填）
 *
 * @apiSuccess {Number} code 0表示成功，-1表示失败
 * @apiSuccess {String} msg  信息
 */
router.post('/addBlog',(req,res)=>{
    let {title,category,hot,content,brief,date,status} = req.body;
    console.log(date)
    if(title && category && hot && content && status ){
        blogListModel.insertMany({title,category,hot,content,status,brief:brief||'暂无简介',date}).then(msg=>{
            res.send({code:0,msg:'新增成功'});
        })
    }else{
        res.send({code:-1,msg:'新增失败'});
    }
})
/**
 * @api {get} /blogList/getBookList 全部博客列表
 * @apiName getBookList
 * @apiGroup Blog
 *
 * @apiSuccess {String} brief  简介
 * @apiSuccess {String} _id  _id
 * @apiSuccess {String} title  标题
 * @apiSuccess {String} category  分类
 * @apiSuccess {Number} hot  热度
 * @apiSuccess {String} content  内容
 * @apiSuccess {Number} status  状态，1：已发表，2暂存中
 * @apiSuccess {String} date  发表或者最近修改日期
 * @apiSuccess {Number} __v  无
 */
router.get('/getBlogList',(req,res)=>{
    blogListModel
    .find()
    .then(msg=>{
        res.send(msg)
    })
})
/**
 * @api {get} /blogList/getReleasedBlogList 已发布博客列表
 * @apiName getReleasedBlogList
 * @apiGroup Blog
 *
 * @apiSuccess {String} brief  简介
 * @apiSuccess {String} _id  _id
 * @apiSuccess {String} title  标题
 * @apiSuccess {String} category  分类
 * @apiSuccess {Number} hot  热度
 * @apiSuccess {String} content  内容
 * @apiSuccess {Number} status  状态，1：已发表
 * @apiSuccess {String} date  发表或者最近修改日期
 * @apiSuccess {Number} __v  无
 */
router.get('/getReleasedBlogList',(req,res)=>{
    blogListModel
    .find()
    .where('status').equals(1)
    .then(msg=>{
        res.send(msg)
    })
})
/**
 * @api {get} /blogList/getPreparedBlogList 待发布博客列表
 * @apiName getPreparedBlogList
 * @apiGroup Blog
 *
 * @apiSuccess {String} brief  简介
 * @apiSuccess {String} _id  _id
 * @apiSuccess {String} title  标题
 * @apiSuccess {String} category  分类
 * @apiSuccess {Number} hot  热度
 * @apiSuccess {String} content  内容
 * @apiSuccess {Number} status  状态，2：暂存中
 * @apiSuccess {String} date  发表或者最近修改日期
 * @apiSuccess {Number} __v  无
 */
router.get('/getPreparedBlogList',(req,res)=>{
    blogListModel
    .find()
    .where('status').equals(2)
    .then(msg=>{
        res.send(msg)
    })
})
/**
 * @api {get} /blogList/blogDetail 博客详情
 * @apiName blogDetail
 * @apiGroup Blog
 * 
 * @apiParam {String} _id _id （必填）
 * 
 * @apiSuccess {String} brief  简介
 * @apiSuccess {String} _id  _id
 * @apiSuccess {String} title  标题
 * @apiSuccess {String} category  分类
 * @apiSuccess {Number} hot  热度
 * @apiSuccess {String} content  内容
 * @apiSuccess {Number} status  状态，1：已发表，2暂存中
 * @apiSuccess {String} date  发表或者最近修改日期
 * @apiSuccess {Number} __v  无
 */
router.get('/blogDetail',(req,res)=>{
    let {_id} = req.query;
    blogListModel
    .find(
        {_id}
    )
    .then(msg=>{
        res.send(msg)
    })
})
/**
 * @api {get} /blogList/findBlog 全部博客模糊查询
 * @apiName findBlog
 * @apiGroup Blog
 *
 * @apiParam {String} searchString 查询关键词 （必填）
 * 
 * @apiSuccess {String} brief  简介
 * @apiSuccess {String} _id  _id
 * @apiSuccess {String} title  标题
 * @apiSuccess {String} category  分类
 * @apiSuccess {Number} hot  热度
 * @apiSuccess {String} content  内容
 * @apiSuccess {Number} status  状态，1：已发表，2暂存中
 * @apiSuccess {String} date  发表或者最近修改日期
 * @apiSuccess {Number} __v  无
 */
router.get('/findBlog',(req,res)=>{
    let {searchString} = req.query;
    blogListModel
    .find(
        {
            $or : [ //多条件，数组
                {title : {$regex: searchString}},
                {content : {$regex : searchString}},
                {brief : {$regex : searchString}}
            ]
        }
    )
    .then(msg=>{
        res.send(msg)
    })
})
/**
 * @api {get} /blogList/findBlogBySearch 模块博客模糊查询
 * @apiName findBlogBySearch
 * @apiGroup Blog
 *
 * @apiParam {String} searchString 查询关键词 （必填）
 * @apiParam {Number} status 1:已发表,2:草稿 （必填）
 * 
 * @apiSuccess {String} brief  简介
 * @apiSuccess {String} _id  _id
 * @apiSuccess {String} title  标题
 * @apiSuccess {String} category  分类
 * @apiSuccess {Number} hot  热度
 * @apiSuccess {String} content  内容
 * @apiSuccess {Number} status  状态，1：已发表，2暂存中
 * @apiSuccess {String} date  发表或者最近修改日期
 * @apiSuccess {Number} __v  无
 */
router.get('/findBlogBySearch',(req,res)=>{
    let {searchString,status} = req.query;
    blogListModel
    .find(
        {
            $or : [ //多条件，数组
                {title : {$regex: searchString}},
                {content : {$regex : searchString}},
                {brief : {$regex : searchString}}
            ]
        }
    )
    .where('status').equals(status)
    .then(msg=>{
        res.send(msg)
    })
})
/**
 * @api {post} /blogList/updateBlog 更改博客信息
 * @apiName updateBlog
 * @apiGroup Blog
 *
 * @apiParam {String} _id _id （必填）
 * @apiParam {String} title 标题 （必填）
 * @apiParam {String} category 分类 （必填）
 * @apiParam {Number} hot 热度 （必填）
 * @apiParam {String} content 内容 （必填）
 * @apiParam {Number} status 状态 （必填,1表示发表，2表示暂存）
 * @apiParam {String} brief 简介 （非必填）
 * @apiParam {String} date 时间 （非必填）
 *
 * @apiSuccess {Number} code 0表示成功，-1表示失败
 * @apiSuccess {String} msg  信息
 */
router.post('/updateBlog',(req,res)=>{
    let {_id,title,category,hot,content,brief,date,status} = req.body;
    if(_id && title && category && hot && content && status){
        blogListModel.update({_id},{title,category,hot,content,status,brief:brief||'暂无简介',date:date||moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}).then(msg => {
            res.send({code:0,msg:'更新成功'});
        })
    }else{
        res.send({code:-1,msg:'更新失败'});
    }
})
/**
 * @api {get} /blogList/deleteBlog 删除博客
 * @apiName deleteBlog
 * @apiGroup Blog
 *
 * @apiParam {String} _id 博客id （必填）
 * 
 * @apiSuccess {Number} code 0表示成功，-1表示失败
 * @apiSuccess {String} msg  信息
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