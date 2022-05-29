const dayjs = require('dayjs');
module.exports = ({ mongoose }) => {
  const Schema = mongoose.Schema;
  const ObjectId = Schema.Types.ObjectId;
  // const RoleSchema = mongoose.modelSchemas.Role;//这个是按文件排序加载的,ascll码
  /**
   * 用户名至少包括数字和字母、下划线中的三选二
   * 角色, 除了唯一的一个超级管理员账号,其他的都是普通项目用户; 分配不同的菜单权限
   * 注意账号密码手机号等的字符串长度问题, 可以在验证中间件中的rules里验证
   */
  const UserSchema = new Schema({
      account: {//账户
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 16,
      },
      mobile: {
        type: String,
        require: true,
        length: 11,
        unique: true,
      },
      password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 32,//16的话md5 32位就超了
      },
      role: {
        type: String,
      },
      homePath: {
        type: String,
        required: true,
      },
      _role_: {//暂时没用上
        type: ObjectId,
        ref: 'Role',
      },
      nickname: {
        type: String,
        required: true,
      },
      createTime: {//账号的创建时间
        type: String,
        required: true,
        default: dayjs().format('YYYY-MM-DD HH:MM:SS'),
      },
      avatar: {// 头像
        type: String,
      },
      email: {
        type: String,
      },
      address: {//住址
        type: Schema.Types.Mixed,
      },
      profile: {//个人简介
        type: String,
      },
      visitCount: {//登录次数
        type: Number,
      },
      remark: {
        type: String,
      },
    },
    {
      timestamps: false,
      versionKey: false,
      strict: true,
    }
  );
  UserSchema.methods.toJSON = function () {
    const obj = mongoose.Document.prototype.toJSON.call(this);
    if(obj._id){
      obj.id = obj._id;
      delete obj._id;
    }
    delete obj.password;
    return obj;
  };
  return mongoose.model('User', UserSchema);
};
