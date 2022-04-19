const jwt = require('jsonwebtoken');
// 如果有token, 验证并且解密得到user: _id, 再获取用户数据; 没有的话就next();
module.exports = () => async (ctx, next) => {
  try {
    //TODO: token也可以加进redis缓存, 后续再说吧
    // const auth = ctx.headers?.authorization?.substr(7);
    // const token = jwt.verify(auth, ctx.app.config.keys);
    // ctx.user = await ctx.service.admin.find(token.id);

    //TODO: 记得删掉这个逻辑, 目前是为了没有做账号登录认证时, 临时绕过token验证
    ctx.user = await ctx.service.user.find('625d58940aa9a93f2c0771e1');
  } catch (e) {
    ctx.logger.error(e);
    ctx.app.error.throw(401);
  }
  await next();
};
