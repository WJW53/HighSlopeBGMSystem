const jwt = require('jsonwebtoken');

module.exports = () => async (ctx, next) => {
  if(!ctx.user){//没有发布过token时才再次验证并发布
    const body = ctx.request.body;//TODO: 这也需要看是手机号还是账号密码
    const { account, password, mobile, sms } = body;
    let user = null//相当于这里只是去数据库查当前用户数据而已
    if(mobile && sms){
      const redis_vc = await ctx.app.redis.get('vc-' + mobile);
      console.log('passport--redis_vccccc', mobile, redis_vc);
      let code = '', message = '', result = null;
      if (redis_vc === null) {
          code = 'ERROR';
          message = '验证码有误';
      } else if (redis_vc === sms) {
          user = await ctx.model.User.findOne({ mobile }, {password: 0});
          if(!user){
              code = 'ERROR';
              message = '该手机号未注册！请先注册！';
              result = null
          }
      } else {
          code = 'ERROR';
          message = '验证码错误，请重新输入';
      }
      if(!user){
        return {code, message, result};
      }
    }else if(account && password){
      user = await ctx.model.User.findOne({
        account,
        password,//md5 ?
      }, {password: 0});
    }else{
      // return null;
    }
    if (user) {
      ctx.user = user;
      const remember = +body.remember || 7;
      const maxAge = remember * 24 * 3600 + 5;
      const expires = Date.now()+maxAge*1000
      const jwtid = Math.random().toString(16).slice(2) + Math.random().toString(16).slice(2);//这俩暂时没用上,
      const token = jwt.sign({ id: user._id, jwtid, expires  }, ctx.app.config.keys, {
        expiresIn: maxAge,// 默认7天多5s
      });
      await ctx.app.redis.set('tokenList-'+token, expires, 'ex', maxAge);
      console.log('userID, JWT分别为: ', user._id, token);
      // 添加到响应头
      ctx.set('authentication', token);
      // 最新：直接放到数据里一起返回吧，然后呢就在login中再读出这个token，封装到返回数据中
      ctx.token = token;
      // const expIn = 3600 * 24 * 7; // token缓存7天
      // await ctx.app.redis.set('token-' + token, JSON.stringify(user), 'ex', expIn);
      //注意：直接存user, 因为user内容经过后续中间件后可能改变, 导致缓存与实际不符;且需要序列化与反序列化
    }
  }
  await next();
};
