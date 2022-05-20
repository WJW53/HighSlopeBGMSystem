module.exports = () => async (ctx, next) => {
  await next();
  if (ctx.status === 404) {
    ctx.app.error.throw(404);
  }
  ctx.status = 200;
  // console.log('ctx.body:  ', ctx.body);

  // 1. 这说明是直接返回的数据库内容
  const hasCodeAttri = Object.keys(ctx.body).includes('code');
  if(!hasCodeAttri && !ctx.body?.result && ctx.body){
    ctx.body = {
      code: 0,
      message: '',
      result: ctx.body,
    }
  }else if(hasCodeAttri){//2. 因为写法上, 如果有code, 肯定有result这个属性
    ctx.body = {
      code: ctx.body.code || 0,
      message: ctx.body.message || '',
      result: ctx.body.result,
    };
  }else if(!hasCodeAttri && ctx.body?.result){//3. 没有code属性，但是有result有值 --> result的值不为空,我不想多写code和message啦，这里帮我处理吧
    ctx.body = {
      code: 0,
      message: ctx.body.message || '',
      result: ctx.body.result,
    };
  }
};
