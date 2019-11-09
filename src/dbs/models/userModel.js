/**
 * 创建集合
*/
// 1.导入模块
const mongoose = require('mongoose');
// 2.创建Schema
let userSchema = mongoose.Schema({
    us:String,
    ps:String
})
// 3.创建Model
let userModel = mongoose.model('users',userSchema);
// 4.导出模块
module.exports = userModel