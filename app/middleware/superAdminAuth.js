const jwt = require('jsonwebtoken');
// 鉴权是否是超级管理员, 如果是则next(); 否则403
module.exports = () => async (ctx, next) => {
  const superAdminId = '625d58940aa9a93f2c0771e1';
  try {
    const isAccess = ctx.user && ctx.user._id.toString() === superAdminId;//因为_id是ObjectId类型
    console.log('是否放行? ', ctx.user._id, isAccess);
    if(isAccess){
      await next();//放行
    }else{
      ctx.body = {
        code: '403',
        message: '权限不足, 您不是超级管理员!',
        result: null,
      };
      ctx.status = 403;
    }
  } catch (e) {
    ctx.logger.error(e);
    ctx.app.error.throw(403);
  }

};
