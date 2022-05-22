const { string } = require("yargs");

module.exports = ({ mongoose }) => {
    const Schema = mongoose.Schema;
    const Mixed = Schema.Types.Mixed;
  
    /**
     * 超级管理员能看到所有用户, 并可以为他们设置角色权限(配对应的菜单权限);
    前端存储所有路由表结构放在一个文件中, 后端分配给用户角色和路由后,
    前端自行写算法从该文件中读取路由配置
        账号创建完毕之后，除了超级管理员外，分配默认的项目用户级别以及对应的菜单权限
     */
    const MenuSchema = new Schema(
      {
        path: {
          type: String,
          required: true,
          unique: true,
        },
        name: {
          type: String,
          required: true,
          unique: true,
        },
        component: {
            type: String,
            required: true,
        },
        isAsync: {//是否是异步组件, 前端收到后先据此判断是否转成函数模式, 使其变为异步加载组件
            type: Boolean,
        },
        redirect: {
            type: String,
        },
        meta: {
            type: Mixed,
        },
        parentMenu: {
            type: String,// 父级菜单的menuNo
        },
        createTime: {
          type: String,
          required: true,
          default: Date.now(),
        },
        /** 以下三个目前都不用 */
        // permission: {
        //     type: String,
        // },
        // status: {
        //   type: String,
        // },
        // remark: {
        //   type: String,
        // },
      },
      {
        timestamps: false,
        versionKey: false,
        strict: true,
      }
    );
    console.log('wjw menu', );
    MenuSchema.add({children: [MenuSchema]});//树形递归定义schema

    // MenuSchema.methods.toJSON = function () {
    //     const obj = mongoose.Document.prototype.toJSON.call(this);
    //     return obj;
    // };
    return mongoose.model('Menu', MenuSchema);
  };
  


//   {
//     menuNo: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     menuName: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     orderNo: {//展示顺序
//         type: String,
//         required: true,
//     },
//     component: {
//         type: String,
//     },
//     // children: {
//     //     type: [Mixed],
//     // },
//     type: {
//         type: String,
//     },
//     icon: {
//         type: String,
//     },
//     parentMenu: {
//         type: String,// 父级菜单的menuNo
//     },
//     createTime: {
//       type: String,
//       required: true,
//       default: Date.now(),
//     },
//     permission: {
//         type: String,
//     },
//     status: {
//       type: String,
//     },
//     remark: {
//       type: String,
//     },
//   },

