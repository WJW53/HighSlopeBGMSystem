const Service = require('../core/BaseService');
const md5 = require('md5');
// const dayjs = require('dayjs');
const superAdminId = '625d58940aa9a93f2c0771e1';
const superAdminAccount = 'wjw';
const superAdminMobile = '17839706350';

const initAccountField = (info, ctx) => {
  info.homePath = info.homePath || '/personal/setting'; // 个人设置页
  info.role = info.role || 'project';
  const randomIndex = ctx.app.utils.getRandom(0, 6);
  info.avatar = info.avatar || ctx.app.config.avatarUrlList[randomIndex];
}


class UserService extends Service {
  /**
   * 用户登录时, 应该去populate把role查出来, 组装成roleName, roleValue,
   * 记得都要查重, 是否注册过、字段值是否合格, 所有密码记得用md5加密
   */
  async login({account, password, mobile, sms}) {
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
          message = '验证码有误';
      } else if (redis_vc === sms) {
          let user = await this.ctx.model.User.findOne({ mobile }, {password: 0});
          if(user){
              user.visitCount = user.visitCount ? user.visitCount + 1 : 1;//每次登录进来都将访问数+1
              await user.save();
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
        password: md5(password),
      }, {password: 0});
      if(user){
        user.visitCount = user.visitCount ? user.visitCount + 1 : 1;//每次登录进来都将访问数+1
        await user.save();
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

    //toObject(); 才能变为js对象
    const jsResult = result?.toObject() || {};
    if(result){// 必须是原result存在时才进行这一步
      const role = await this.ctx.model.Role.findOne({ roleValue: jsResult.role }, { roleValue: 1, roleName: 1 });
      jsResult.id = jsResult._id ? jsResult._id : jsResult.id;
      jsResult.role = [role];// 最好加容错处理
      jsResult.token = this.ctx.token;
      delete jsResult._id;
      console.log('jsResult已经拦截成mock的testA并返回给前端', code, message, jsResult);
    }
    return {
      code, message, result: jsResult
    }
  }

  //使jwt失效: token黑名单; 版本号
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
        message = '验证码有误';
    } else if (redis_vc === info.sms) {
    // 检查是否存在user，如果没有就添加
        let user = await this.ctx.model.User.find({
          $or: [{account: info.account}, {mobile: info.mobile}]
        }, {password: 0});
        console.log('user', user);
        if(user===null || (Array.isArray(user) && user.length===0)){
            initAccountField(info, this.ctx);
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
    const {account, newPassword, mobile, sms} = info;
    let code = 0;
    let message = '';
    let result = null;
    /** 手机号验证码登录验证 */
    if(mobile && sms){
      const redis_vc = await this.app.redis.get('vc-' + mobile);
      console.log('resetPassword--redis_vccccc', mobile, redis_vc);
      if (redis_vc === null) {
          code = 'ERROR';
          message = '验证码有误';
      } else if (redis_vc === sms) {
        let user = await this.ctx.model.User.findOneAndUpdate(
          { account, mobile},
          { password: md5(newPassword), },
          { new: true, }//runValidators: true, //new: true代表要返回更新后的doc
        );
        if(user){
            code = 0;
            message = '重置密码成功！';
            result = {account: user.account, mobile: user.mobile};
        }else{
            code = 'ERROR';
            message = '该账号未注册！请先注册！';
            result = null
        }
      } else {
          code = 'ERROR';
          message = '验证码错误，请重新输入';
      }
    }
    return {code, message, result};
  }

  async changePassword(info) {
    console.log('正在修改用户密码', info);
    // 这里应该看是否存在ctx.user, 存在说明已经登录, 可以修改, 否则不能修改;
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
        { account: info.account, password: md5(info.password) },
        { password: md5(info.newPassword) },
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
   * 每个账号初始化建立后, 要先初始化一些信息
   */
  async add(info) {
    let body = {
      code: 0,
      message: '',
      result: null,
    }
    this.ctx.app.utils.deleteThe_id(info);
    try {
      initAccountField(info, this.ctx);
      info.password = md5(info.password);
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
    // 记得加校验
    this.ctx.app.utils.deleteThe_id(info);
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

  //组合出分析页所需的各项数据
  async getAnalysisRes(userId) {
    const visitCount =  this.ctx.user.visitCount || 0;
    const filter = { _user_: userId };
    const stationCount = await this.ctx.model.Station.countDocuments(filter);
    const equipmentCount = await this.ctx.model.Equipment.countDocuments(filter);
    const projectList = await this.ctx.model.Project.find(filter);
    const projectCount = projectList.length;

    /** 项目采集频率统计处理 与 监测城市数据统计处理 与 监测时间数据统计处理 */
    const frequencyAnalysisData = [];
    const frequencyMap = {};
    const cityAnalysisData = [];
    const cityMap = {};
    const monitorDiffTimeAnalysisData = [];
    const monitorTimeMap = {};
    projectList.forEach((item)=>{
      frequencyMap[item.frequency] = frequencyMap[item.frequency] ? frequencyMap[item.frequency] + 1 : 1;
      cityMap[item.location[0]] = cityMap[item.location[0]] ? cityMap[item.location[0]] + 1 : 1;
      monitorTimeMap[item.monitorDiffTime] = monitorTimeMap[item.monitorDiffTime] ? monitorTimeMap[item.monitorDiffTime] + 1 : 1;
    });
    for(const key of Object.keys(frequencyMap)){
      frequencyAnalysisData.push({name: key, value: frequencyMap[key]});
    }
    for(const key of Object.keys(cityMap)){
      cityAnalysisData.push({name: key, value: cityMap[key]});
    }
    for(const key of Object.keys(monitorTimeMap)){
      monitorDiffTimeAnalysisData.push({name: key, value: monitorTimeMap[key]});
    }

    /**  */

    return {
      stationCount,
      equipmentCount,
      projectCount,
      visitCount,
      frequencyAnalysisData,
      cityAnalysisData,
      monitorDiffTimeAnalysisData
    }
  }

  async findAll(body) {//只有超级管理员有资格查找所有的账号
    const options = this.getPagerOptions(body);
    const { account, nickname, mobile, role } = options;
    console.log('超级管理员查询所有用户最终options', options);

    /** 多字段模糊匹配分页查询 */
    const filter = {
      _id: { $ne: superAdminId },
      account: { $ne: 'wjw' },
    };
    if(account || nickname || mobile || role){
      filter['$and'] = [];
      account && filter['$and'].push({ account: { $regex: account, $options: 'i' } });
      nickname && filter['$and'].push({ nickname: { $regex: nickname, $options: 'i' } });
      mobile && filter['$and'].push({ mobile: { $regex: mobile, $options: 'i' } });
      role && filter['$and'].push({ role: { $regex: role, $options: 'i' } });
    }
    const allRole = await this.ctx.model.Role.find({}, {roleValue: 1, roleName: 1});
    const total = await this.ctx.model.User.countDocuments(filter);
    const data = await this.ctx.model.User.find(filter, {avatar: 0})
      .skip((options.page - 1) * options.limit)
      .limit(options.limit);
    const newData = data.map(item => item.toObject()).map(item => {
      const curRole = allRole.find(role => role.roleValue === item.role);
      item.role = curRole;
      if(item._id){//toObject后就保留了_id了, 只有当作响应体发送出去时, egg底层才会默认调用toJSON
        item.id = item._id;
        delete item._id;
      }
      return item;
    });//格式化处理role字段
    return {
      result: {
        result: newData,
        total,
      }
    };
  }
}

module.exports = UserService;
