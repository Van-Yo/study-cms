const moment = require('moment');
/**
 * 创建集合
*/
// 1.导入模块
const mongoose = require('mongoose');
// 2.创建Schema
let blogListSchema = new mongoose.Schema({
    title: String,
    category:String,
    hot:Number,
    content:String,
    brief:{ type: String, default: '暂无简介' },
    date: {
        type:String,
        default:() => moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    }
})
// 3.创建Model
let blogListModel = mongoose.model('blogLists',blogListSchema);
// 4.导出模块
module.exports = blogListModel