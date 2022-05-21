const jwt = require('jsonwebtoken');
// 如果有token, 验证并且解密得到user: _id, 再获取用户数据; 没有的话就next();
module.exports = () => async (ctx, next) => {
  try {
    const authorization = ctx.headers?.authorization?.split(' ') || '';
    if(authorization.length > 0){
      const auth = authorization.length === 1 ? authorization[0] : authorization[1];// 在于Bearer存在与否
      console.log('auth token:  ', auth);//这个auth就是token
      const isExist = await ctx.app.redis.get('tokenList-'+auth);
      if(auth && isExist){//有效且未被注销
        const token = jwt.verify(auth, ctx.app.config.keys);
        ctx.user = await ctx.service.user.findOne(token.id);
        ctx.token = auth;
      }else if(auth && !isExist){
        ctx.logger.info('身份未授权');
        console.log('身份未授权', auth);
        ctx.statusCode = 401;
        ctx.body = { code: 401, message: '您的身份未授权！请重新登录！', result: null };
        return;
      }
    }
  } catch (e) {
    ctx.logger.error(e);
    ctx.app.error.throw(401);
  }
  await next();
};
