const Service = require('egg').Service;

class BaseService extends Service {
  validate(rules, obj) {
    try {
      const result = this.ctx.validate(rules, obj);//成功校验则返回undefined, 失败则throw error, 进入catch
      console.log('BaseService validte', result);
      return result;
    } catch (e) {
      console.log('validate校验失败！ ', e.errors);//
      this.throw(406, JSON.stringify(e.errors));
    }
  }

  throw(code, message) {
    this.ctx.app.error.throw(code, message);//ConsultError
  }

  getPagerOptions(options) {
    console.log(options);
    options.page = +options.page || 1;
    options.limit = (+options.pageSize) || (+options.limit) ||10;
    options.keyword = options.keyword || '';
    options._user_ = this.ctx?.user?._id;//若有，则代表已经认证过token了
    delete options._t;//删除get请求发过来的_t时间戳参数
    for(const key of Object.keys(options)){
      options[key] = typeof options[key] === 'string' ? options[key].trim() : options[key];
    }
    return options;
  }
}

module.exports = BaseService;
