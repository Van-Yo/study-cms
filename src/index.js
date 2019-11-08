// ************************************ 模块导入 ************************************
const express = require('express')

// 新建express服务
const app = express()

// 路由
app.get('/',(req,res)=>{
    res.send({code:0,data:[]});
})

// 开启服务
app.listen(3000)