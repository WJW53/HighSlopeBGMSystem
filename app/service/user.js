const Service = require('../core/BaseService');

class UserService extends Service {
  // TODO: 记得都要查重, 是否注册过、字段值是否合格, 所有密码记得用md5加密

  async login({account, password}) {
    console.log('node接收到前端代理过来的请求了!!', account, password);
    return {
      "userId": "625d58940aa9a93f2c0771e1",
      "account": "wjw",
      "nickname": "WJW Service",
      "avatar": "https://q1.qlogo.cn/g?b=qq&nk=190848757&s=640",
      "desc": "manager",
      "password": "123456",
      "token": "fakeToken1",
      "homePath": "/personal/changePassword",
      "roles": [
          {
              "roleName": "Super Admin",
              "value": "super"
          }
      ]
  };
  //TODO: 到时候联表查询然后格式化数据传给前端.
    return await this.ctx.model.User.findOne({
      account,
      password,
      // loginPwd: md5(loginPwd),
    });
  }


  async logout(params){
    return `已经注销`;
  }

  async register(info) {
    console.log('正在注册的用户信息', info);
    // const { password, ...rest } = doc;
    // return rest;//不行 返回的是doc还有User原型链上的东西, why?
    //TODO: 校验redis缓存的5分钟的验证码是否正确,用户名是否已经存在 然后才可注册
    const mobile = info.mobile;
    const redis_vc = await this.app.redis.get('vc-' + mobile);
    console.log('redis_vccccc', mobile, redis_vc);
    let code = 0;
    let message = '';
    let result = null;
    if (redis_vc === null) {
        code = 'ERROR';
        message = '超时，请重新获取验证码。';
    } else if (redis_vc === info.sms) {
    // 检查是否存在user，如果没有就添加
        let user = await this.ctx.model.User.find({account: info.account});
        console.log('user', user);
        if(user===null || (Array.isArray(user) && user.length===0)){
            user = await this.ctx.model.User.create(info);
            code = 0;
            message = '注册成功！';
            result = user;
        } else {
            code = 'ERROR';
            message = '该账户已存在！不可重复注册!';
        }
    } else {
        code = 'ERROR';
        message = '验证码错误，请重新输入';
    }
    return {code, message, result};
  }

  // 这俩貌似也可以合并为一个: 就是要多做几个or关系的验证和筛选
  async resetPassword(info) {
    console.log('正在重置用户密码', info);
    // TODO: 验证验证码是否正确 info.smsCode;
    return await this.ctx.model.User.findOneAndUpdate(
      { account: info.account, mobile: info.mobile },
      { password: info.newPassword },
      { new: true, }//runValidators: true, //new: true代表要返回更新后的doc
    );
  }

  async changePassword(info) {
    console.log('正在修改用户密码', info);
    // TODO: 这里应该把user._id也传进去作为筛选条件, 后续记得加上
    return await this.ctx.model.User.findOneAndUpdate(
      { account: info.account, password: info.password },
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
    // this.validate(
    //   {
    //     name: {
    //       type: 'string',
    //       required: false,
    //       allowEmpty: false,
    //     },
    //     url: {
    //       type: 'string',
    //       required: false,
    //       allowEmpty: true,
    //     },
    //     github: {
    //       type: 'string',
    //       required: false,
    //       allowEmpty: true,
    //     },
    //     description: {
    //       type: 'array',
    //       itemType: 'string',
    //       required: false,
    //     },
    //     order: {
    //       type: 'int',
    //       required: false,
    //     },
    //     thumb: {
    //       type: 'string',
    //       required: false,
    //       allowEmpty: false,
    //     },
    //   },
    //   info
    // );
    // TODO: 记得加校验
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
