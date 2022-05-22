const Service = require('../core/BaseService');

class MenuService extends Service {
  async add(info) {
    if(Object.keys(info).includes('_id')){
      delete info._id;//防止改了_id;
    }
    return await this.ctx.model.Menu.create(info);
  }

  async update(id, info) {
    if(Object.keys(info).includes('_id')){
      delete info._id;//防止改了_id;
    }
    await this.ctx.model.Menu.updateOne({ _id: id }, { $set: info });
    return await this.find(id);
  }

  async remove(id) {
    await this.ctx.model.Menu.remove({ _id: id });
    return true;
  }

  async find(id) {
    return await this.ctx.model.Menu.findById(id);
  }

  async findAll(query) {
    // const menuList = (() => {
    //     const result = [];
    //     for (let index = 0; index < 3; index++) {
    //       result.push({
    //         menuNo: `${index}`,
    //         icon: ['ion:layers-outline', 'ion:git-compare-outline', 'ion:tv-outline'][index],
    //         component: 'LAYOUT',
    //         type: '0',
    //         menuName: ['Dashboard', '权限管理', '功能'][index],
    //         permission: '',
    //         orderNo: index + 1,
    //         createTime: '@datetime',
    //         'status|1': ['0', '0', '1'],
    //         children: (() => {
    //           const children = [];
    //           for (let j = 0; j < 4; j++) {
    //             children.push({
    //               menuNo: `${index}-${j}`,
    //               type: '1',
    //               menuName: ['菜单1', '菜单2', '菜单3', '菜单4'][j],
    //               icon: 'ion:document',
    //               permission: ['menu1:view', 'menu2:add', 'menu3:update', 'menu4:del'][index],
    //               component: [
    //                 '/dashboard/welcome/index',
    //                 '/dashboard/analysis/index',
    //                 '/dashboard/workbench/index',
    //                 '/dashboard/test/index',
    //               ][j],
    //               orderNo: j + 1,
    //               createTime: '@datetime',
    //               'status|1': ['0', '1'],
    //               parentMenu: `${index}`,
    //               children: (() => {
    //                 const children = [];
    //                 for (let k = 0; k < 4; k++) {
    //                   children.push({
    //                     menuNo: `${index}-${j}-${k}`,
    //                     type: '2',
    //                     menuName: '按钮' + (j + 1) + '-' + (k + 1),
    //                     icon: '',
    //                     permission:
    //                       ['menu1:view', 'menu2:add', 'menu3:update', 'menu4:del'][index] +
    //                       ':btn' +
    //                       (k + 1),
    //                     component: [
    //                       '/dashboard/welcome/index',
    //                       '/dashboard/analysis/index',
    //                       '/dashboard/workbench/index',
    //                       '/dashboard/test/index',
    //                     ][j],
    //                     orderNo: j + 1,
    //                     createTime: '@datetime',
    //                     'status|1': ['0', '1'],
    //                     parentMenu: `${index}-${j}`,
    //                     children: undefined,
    //                   });
    //                 }
    //                 return children;
    //               })(),
    //             });
    //           }
    //           return children;
    //         })(),
    //       });
    //     }
    //     return result;
    //   })();
    const menuList = await this.ctx.app.utils.menuList;
    return menuList;
  }
}

module.exports = MenuService;
