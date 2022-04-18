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
      acount: {//账户
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 16,
      },
      phoneNo: {
        type: String,
        require: true,
        unique: true,
        length: 11,
      },
      password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 16,
      },
      _role_: {
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
        default: Date.now(),
      },
      avatar: {// 头像
        type: String,
      },
      email: {
        type: String,
      },
      address: {//住址
        type: String,
      },
      profile: {//个人简介
        type: String,
      },
      remark: {
        type: String,
      },
      // 因为这些表里存了acount, 到时直接在那些数据里通过account存数据得
      // projectNo: {
      //   type: ObjectId,
      //   ref: 'Station',
      //   required: true,
      // },
      // equipmentNo: {
      //   type: ObjectId,
      //   ref: 'Equipment',
      //   required: true,
      // },
      // stationNo: {
      //   type: ObjectId,
      //   ref: 'Station',
      //   required: true,
      // },
    },
    {
      timestamps: false,
      versionKey: false,
      strict: true,
    }
  );
  return mongoose.model('User', UserSchema);
};
