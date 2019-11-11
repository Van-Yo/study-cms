/**
 * 连接数据库
*/
// 1.导入模块
const mongoose = require('mongoose');
// 2.配置连接数据库信息
//mongoose.connect('mongodb://127.0.0.1:27017/abc',{useNewUrlParser: true,useUnifiedTopology: true});
// 服务器上的数据库设置了：1.特定的数据库名;2.账号和密码;3.读写的权限
mongoose.connect('mongodb://vanlus:yinxiaofu799@127.0.0.1:27017/studycms',{useNewUrlParser: true,useUnifiedTopology: true});
// 3.连接数据库
let db = mongoose.connection;
// 4.连接数据库的回调
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('连接成功');
});
