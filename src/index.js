// ************************************ 模块导入 ************************************
const express = require('express')
const bodyParser = require('body-parser')
const qs = require('querystring')
const user = require('./routes/user')
const dbConnect = require('./dbs/connect');
// 新建express服务
const app = express()

/**
 * req.query获取get的请求数据
 * body-parser获取POST请求数据,接下来可以用req.body来获取
*/
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// CORS
app.use('*',(req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*'); //这个表示任意域名都可以访问，这样写不能携带cookie了。
    //res.header('Access-Control-Allow-Origin', 'http://www.baidu.com'); //这样写，只有www.baidu.com 可以访问。
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');//设置方法
    if (req.method == 'OPTIONS') {
        res.send(200); // 意思是，在正常的请求之前，会发送一个验证，是否可以请求。
    }else {
        next();
    }
});

// 路由
app.use('/user',user);
// 开启服务
app.listen(3000)