/**
 * 创建集合
*/
// 1.导入模块
const mongoose = require('mongoose');
// 2.创建Schema
let categorySchema = new mongoose.Schema({
    name: String,
    id:Number
})
// 3.创建Model
let categoryModel = mongoose.model('categorys',categorySchema);
// 4.导出模块
module.exports = categoryModel