const Service = require('../core/BaseService');

class UserService extends Service {
  // TODO: 记得都要查重, 是否注册过、字段值是否合格, 所有密码记得用md5加密
  async login({account, password, mobile, sms}) {
    // if(this.ctx.user){
    //     console.log('jwt直接返回用户信息', this.ctx.user);
    //     return this.ctx.user;//jwt验证过了, 可以直接返回
    // }
    console.log('node接收到前端代理过来的请求了!!', account, password, mobile, sms);
    let code = 0;
    let message = '';
    let result = null;
    /** 手机号验证码登录验证 */
    if(mobile && sms){
      const redis_vc = await this.app.redis.get('vc-' + mobile);
      console.log('redis_vccccc', mobile, redis_vc);
      if (redis_vc === null) {
          code = 'ERROR';
          message = '超时，请重新获取验证码。';
      } else if (redis_vc === sms) {
          let user = await this.ctx.model.User.findOne({ mobile }, {password: 0});
          if(user){
              code = 0;
              message = '登录成功！';
              result = user;
          }else{
              code = 'ERROR';
              message = '该手机号未注册！请先注册！';
              result = null
          }
      } else {
          code = 'ERROR';
          message = '验证码错误，请重新输入';
      }
    }else if(account && password){
      /** 账号密码登录验证 */
      const user = await this.ctx.model.User.findOne({
        account,
        password,//md5 ?
      }, {password: 0});
      if(user){
        code = 0;
        message = '登录成功！';
        result = user;
      }else{
        code = 'ERROR';
        message = '账号或密码错误，请重新输入';
        result = null;
      }
    }else{
      // return null;
    }
    // const testA = {
    //   "id": "625d58940aa9a93f2c0771e1",
    //   "account": "wjw",
    //   "nickname": "WJW Service",
    //   "avatar": "https://q1.qlogo.cn/g?b=qq&nk=190848757&s=640",
    //   "desc": "manager",
    //   "password": "123456",
    //   "token": "fakeToken1",
    //   "homePath": "/personal/changePassword",
    //   "role": [
    //       {
    //           "roleName": "Super Admin",
    //           "roleValue": "super"
    //       }
    //   ]
    // };
    //TODO: 下面的部分操作记得删除啥的 到时候联表查询然后格式化数据传给前端.
    const jsResult = result?.toObject() || {};
    if(result){// 必须是原result存在时才进行这一步
      jsResult.id = jsResult._id ? jsResult._id : jsResult.id;
      jsResult.homePath = '/personal/changePassword';//首页
      if(jsResult.id.toString() === '625d58940aa9a93f2c0771e1'){//TODO: test super admin
        jsResult.role = [
          {
            "roleName": "Super Admin",
            "roleValue": "super"
          }
        ];
      }
      jsResult.token = this.ctx.token;
      delete jsResult._id;
      console.log('jsResult已经拦截成mock的testA并返回给前端', code, message, jsResult);
    }
    return {
      code, message, result: jsResult
    }
  }

//TODO: 使jwt失效: token黑名单; 版本号
  async logout(params){
    const res = await this.app.redis.del('tokenList-' + this.ctx.token);
    console.log('已经删除该用户token', res);
    return `该账户已退出`;
  }

  async register(info) {
    this.ctx.app.utils.deleteThe_id(info);
    console.log('正在注册的用户信息', info);
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
        let user = await this.ctx.model.User.find({
          $or: [{account: info.account}, {mobile: info.mobile}]
        }, {password: 0});
        console.log('user', user);
        if(user===null || (Array.isArray(user) && user.length===0)){
            info.homePath = '/personal/changePassword';//首页
            info.role = [
              {
                  "roleName": "普通项目用户",
                  "roleValue": "project"
              }
            ];
            info.avatar = "https://q1.qlogo.cn/g?b=qq&nk=190848757&s=640";
            user = await this.ctx.model.User.create(info);//落库
            code = 0;
            message = '注册成功！';
            result = user;
        } else {
            code = 'ERROR';
            message = '该账户名或者手机号已存在！不可重复注册!';
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
    // TODO: 这里应该看是否存在ctx.user, 存在说明已经登录, 可以修改, 否则不能修改;
    if(this.ctx.user){
      if(info.password===info.newPassword){
        return {
          code: 'ERROR',
          message: '新旧密码不可相同！',
          result : null,
        }
      }else if(info.confirmPassword!==info.newPassword){
        return {
          code: 'ERROR',
          message: '确认密码与新密码不同！',
          result : null,
        }
      }
      const result = await this.ctx.model.User.findOneAndUpdate(
        { account: info.account, password: info.password },
        { password: info.newPassword },
        { new: true, }//runValidators: true, 
      );
      if(result){
        return { result };
      }else{
        return {
          code: 'ERROR',
          message: '旧密码错误！',
          result: null,
        }
      }
    }else{
      return {
        code: 'ERROR',
        message: '您尚未登录，不可使用系统内置修改密码功能！',
        result: null,
      }
    }
  }

  /**
   * 
   * TODO: 每个账号初始化建立后, 就给它两个可选设备、工位; 普通用户权限
   */
  async add(info) {
    let body = {
      code: 0,
      message: '',
      result: null,
    }
    this.ctx.app.utils.deleteThe_id(info);
    try {
      this.validate(
        {
          account: {
            type: 'string',
            // min: 3,
            // max: 16
          },
          password: {
            type: 'string',
          },
          mobile: {
            type: 'string',
          },
          nickname: {
            type: 'string',
          },
          // role: {
          //   type: 'array',
          //   itemType: 'object',
          //   allowEmpty: true,
          // }
        },
        info
      );
      if(typeof info.role === 'string'){

      }
      body.result = await this.ctx.model.User.create(info);//错误可能在这儿！！在create时, 先针对model进行校验, 不通过就error了
      console.log('成功新增账户：', body.result);
    } catch (error) {
      console.log('新增账户落库前Model层校验失败', error);
      body.code = '406';
      body.message = '校验失败，该账户数据不合规范！';
    }
      return this.ctx.body = body;
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
    if(Object.keys(info).includes('_id')){
      delete info._id;//防止改了_id;
    }
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

  async findAll(body) {//只有超级管理员有资格查找所有的账号
    const options = this.getPagerOptions(body);
    const { account, nickname, mobile, role } = options;
    console.log('超级管理员查询所有用户最终options', options);

    /** 多字段模糊匹配分页查询 */
    const filter = {};
    if(account || nickname || mobile){////TODO: 还有roles
      filter['$and'] = [];
      account && filter['$and'].push({ account: { $regex: account, $options: 'i' } });
      nickname && filter['$and'].push({ nickname: { $regex: nickname, $options: 'i' } });
      mobile && filter['$and'].push({ mobile: { $regex: mobile, $options: 'i' } });
    }

    const total = await this.ctx.model.User.countDocuments(filter);
    const data = await this.ctx.model.User.find(filter, {avatar: 0})
      .skip((options.page - 1) * options.limit)
      .limit(options.limit);
      // .sort('-createTime')
      // .populate('_role_', '_id roleName roleValue');
    return {
      result: {
        result: data,
        total,
      }
    };
  }
}

module.exports = UserService;
