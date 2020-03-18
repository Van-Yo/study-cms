/**
 * @name checklogin
 * @description 检查用户是否登录的中间件
 * @author postbird
 */

module.exports = (req,res,next)=>{
    if(!req.session.user){
        res.send({code:-99,msg:'尚未登录'});
        return;
    }
    next();
}