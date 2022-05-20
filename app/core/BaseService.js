const Service = require('egg').Service;

class BaseService extends Service {
  validate(rules, obj) {
    try {
      this.ctx.validate(rules, obj);
    } catch (e) {
      console.log(e);
      this.throw(406, JSON.stringify(e.errors));
    }
  }

  throw(code, message) {
    this.ctx.app.error.throw(code, message);
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
