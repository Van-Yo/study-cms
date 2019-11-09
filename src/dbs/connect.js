/**
 * 连接数据库
*/
// 1.导入模块
const mongoose = require('mongoose');
// 2.配置连接数据库信息
mongoose.connect('mongodb://vanlus:82PKIbSxJ0#$rEPO@127.0.0.1:27017/admin',{useNewUrlParser: true,useUnifiedTopology: true});
// 3.连接数据库
let db = mongoose.connection;
// 4.连接数据库的回调
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('连接成功');
});
