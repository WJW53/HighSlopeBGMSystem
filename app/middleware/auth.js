const jwt = require('jsonwebtoken');
// 如果有token, 验证并且解密得到user: _id, 再获取用户数据; 没有的话就next();
module.exports = () => async (ctx, next) => {
  try {
    const authorization = ctx.headers?.authorization?.split(' ') || '';
    if(authorization.length > 0){
      const auth = authorization.length === 1 ? authorization[0] : authorization[1];// 在于Bearer存在与否
      console.log('auth token:  ', auth);
      const token = jwt.verify(auth, ctx.app.config.keys);
      ctx.user = await ctx.service.user.findOne(token.id);
      ctx.token = auth;
    }
    // //TODO: 记得删掉这个逻辑, 目前是为了没有做账号登录认证时, 临时绕过token验证
    // ctx.user = await ctx.service.user.find('625d58940aa9a93f2c0771e1');
  } catch (e) {
    ctx.logger.error(e);
    ctx.app.error.throw(401);
  }
  await next();
};
