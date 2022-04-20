const jwt = require('jsonwebtoken');
// 鉴权是否是超级管理员, 如果是则next(); 否则403
module.exports = () => async (ctx, next) => {
  try {
    // //TODO: token也可以加进redis缓存, 后续再说吧
    // const auth = ctx.headers?.authorization?.substr(7);
    // const token = jwt.verify(auth, ctx.app.config.keys);
    // if(token.id === ctx.superAdmin._id){
    //     await next();
    // }else{
    //     ctx.app.error.throw(403);//或者写响应403的消息体
    // }
    //TODO: 记得删掉这个逻辑, 目前是为了没有做账号登录认证时, 临时绕过token验证
    ctx.user = await ctx.service.user.find('625d58940aa9a93f2c0771e1');// wjw管理员
  } catch (e) {
    ctx.logger.error(e);
    ctx.app.error.throw(401);
  }
  await next();
};
