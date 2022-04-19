const Service = require('../core/BaseService');

class UserService extends Service {
  // TODO: 记得都要查重, 是否注册过、字段值是否合格, 密码记得用md5加密

  async login({username, password}) {
    console.log('node接收到前端代理过来的请求了!!', username, password);
    return await this.ctx.model.User.findOne({
      account: username,
      password: password,
      // loginPwd: md5(loginPwd),
    });
  }

  async register(info) {
    console.log('正在注册的用户信息', info);
    return await this.ctx.model.User.create(info);// 记得改返回值
    // const { password, ...rest } = doc;
    // return rest;//不行 返回的是doc还有User原型链上的东西, why?
  }

  // 这俩貌似也可以合并为一个: 就是要多做几个or关系的验证和筛选
  async resetPassword(info) {
    console.log('正在重置用户密码', info);
    // TODO: 验证验证码是否正确 info.smsCode;
    return await this.ctx.model.User.findOneAndUpdate(
      { account: info.account, phoneNo: info.phoneNo },
      { password: info.newPassword },
      { new: true, }//runValidators: true, //new: true代表要返回更新后的doc
    );
  }

  async changePassword(info) {
    console.log('正在修改用户密码', info);
    return await this.ctx.model.User.findOneAndUpdate(
      { account: info.account },
      { password: info.newPassword },
      { new: true, }//runValidators: true, 
    );
  }

  /**
   * 
   * TODO: 每个账号初始化建立后, 就给它两个可选设备、工位; 普通用户权限
   */
  async add(info) {
    this.validate(
      {
        name: 'string',
        url: {
          type: 'string',
          allowEmpty: true,
        },
        github: {
          type: 'string',
          allowEmpty: true,
        },
        description: {
          type: 'array',
          itemType: 'string',
        },
        order: 'int?',
        thumb: 'string',
      },
      info
    );
    info.order = +info.order;
    if (isNaN(+info.order)) {
      info.order = 0;
    }
    return await this.ctx.model.User.create(info);
  }

  async update(id, info) {
    this.validate(
      {
        name: {
          type: 'string',
          required: false,
          allowEmpty: false,
        },
        url: {
          type: 'string',
          required: false,
          allowEmpty: true,
        },
        github: {
          type: 'string',
          required: false,
          allowEmpty: true,
        },
        description: {
          type: 'array',
          itemType: 'string',
          required: false,
        },
        order: {
          type: 'int',
          required: false,
        },
        thumb: {
          type: 'string',
          required: false,
          allowEmpty: false,
        },
      },
      info
    );
    await this.ctx.model.User.updateOne({ _id: id }, { $set: info });
    return await this.find(id);
  }

  async remove(id) {
    await this.ctx.model.User.remove({ _id: id });
    return true;
  }

  async find(id) {
    return await this.ctx.model.User.findById(id);
  }

  async findOne(id) {
    return await this.ctx.model.User.findById(id);
  }

  async findAll() {
    return await this.ctx.model.User.find().sort('order');
  }
}

module.exports = UserService;
