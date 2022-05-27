module.exports = ({ mongoose }) => {
  const Schema = mongoose.Schema;
  const ObjectId = Schema.Types.ObjectId;

  /**
   * 超级管理员能看到所有用户, 并可以为他们设置角色权限(配对应的菜单权限);
  前端存储所有路由表结构放在一个文件中, 后端分配给用户角色和路由后,
  前端自行写算法从该文件中读取路由配置
      账号创建完毕之后，除了超级管理员外，分配默认的项目用户级别以及对应的菜单权限
   */
  const RoleSchema = new Schema(
    {
      roleName: {
        type: String,
        required: true,
        unique: true,
      },
      roleValue: {
        type: String,
        required: true,
        unique: true,
      },
      // _user_: {//其实最好还是要关联一下_user_, 但貌似也没必要, 因为已经有验证超级管理员的中间件了
      //   type: ObjectId,
      //   required: true,
      // },
      menuList: {
        type: [String],
        required: true,
      },
      createTime: {
        type: String,
        required: true,
        default: Date.now(),
      },
      status: {
        type: String,
        // required: true,
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
  console.log('wjw role', );
  return mongoose.model('Role', RoleSchema);
};
