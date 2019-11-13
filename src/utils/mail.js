'use strict';
const nodemailer = require('nodemailer');
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: '1079345631@qq.com', // generated ethereal user
        pass: 'fkyztstsdruhffgg' // generated ethereal password
    }
});
function mailToAddress(address,code){
    // send mail with defined transport object
    let info = {
        from: '"验证码信息" <1079345631@qq.com>', // sender address
        to: address, // list of receivers
        subject: `Hello ${address}`, // Subject line
        text: `【studycms】 您的验证码为：${code}, 5分钟有效` // plain text body
    };
    return new Promise((resolve,reject)=>{
        transporter.sendMail(info,(err,data)=>{
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })    
}
module.exports = {mailToAddress}
