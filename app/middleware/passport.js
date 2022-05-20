const jwt = require('jsonwebtoken');

module.exports = () => async (ctx, next) => {
  if(!ctx.user){//没有发布过token时才再次验证并发布
    const body = ctx.request.body;//TODO: 这也需要看是手机号还是账号密码
    const user = await ctx.model.User.findOne(body);//相当于这里只是去数据库查当前用户数据而已
    ctx.user = user;
    if (user) {
      const remember = +body.remember || 7;
      const maxAge = remember * 24 * 3600 + 5;
  
      const token = jwt.sign({ id: user._id }, ctx.app.config.keys, {
        expiresIn: maxAge,// 默认7天多5s
      });
      console.log('userID, JWT分别为: ', user._id, token);
      // 添加到响应头
      ctx.set('authentication', token);
      // 最新：直接放到数据里一起返回吧，然后呢就在login中再读出这个token，封装到返回数据中
      ctx.token = token;
      // const expIn = 3600 * 24 * 7; // token缓存7天
      // await this.app.redis.set('token-' + token, JSON.stringify(user), 'ex', expIn);
      //注意：直接存user, 因为user内容经过后续中间件后可能改变, 导致缓存与实际不符;且需要序列化与反序列化
    }
  }
  await next();
};
