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

  async findAll(roleValue) {
    const role = await this.ctx.model.Role.findOne({ roleValue });//先去角色表找对应菜单列表
    // const menuFilter = { $or: [] };
    // role.menuList.forEach(name => {
    //   menuFilter['$or'].push({ name });//tnnd  $or好像最多13个, 所以不要用这个
    // });
    // const allFilterMenu = await this.ctx.model.Menu.find(menuFilter);
    const allMenuInfo = await this.ctx.model.Menu.find();
    console.log('MenuService-findAll-Role', roleValue, role.menuList);
    // console.log('MenuService-findAll: ', { allMenuInfo });
    const jsAllMenu = [];
    for(const menu of allMenuInfo){
      const tempMenu = menu.toObject();//不转的话都是doc
      jsAllMenu.push(tempMenu);
    }
    const newMenuList = this.ctx.app.utils.getForFrontEndMenuList(role.menuList, this.ctx.app.utils.allMenuLayerMap, jsAllMenu);
    console.log('MenuService--newMenuList: ', newMenuList)
    return newMenuList;
  }


  // 直接返回已经设置好的全量的菜单的基本数据, 不需要在数据库中找, 因为这个东西没有落库, 如果落库需要落到另一个库, 而不是menu库
  getAllMenuBasicInfo(query) {
    const menuList = this.ctx.app.utils.allMenuBasicInfoList;
    const finallyList = menuList.filter(menu => menu.menuNo !== 'Permission');//去掉权限管理, 因为这个是只有超级管理员才有的, 不能分配给其他角色
    return finallyList;
  }
}

module.exports = MenuService;
