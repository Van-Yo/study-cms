/**
 * 创建集合
*/
// 1.导入模块
const mongoose = require('mongoose');
// 2.创建Schema
let bookSchema = new mongoose.Schema({
    name: String,
    publicDate: String,
    price:String,
    category:Number,
    number:Number
})
// 3.创建Model
let bookModel = mongoose.model('books',bookSchema);
// 4.导出模块
module.exports = bookModel