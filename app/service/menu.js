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

  async findAll(id) {
    return await this.ctx.model.Menu.find();
  }


  // 直接返回已经设置好的全量的菜单的基本数据, 不需要在数据库中找, 因为这个东西没有落库, 如果落库需要落到另一个库, 而不是menu库
  async getAllMenuBasicInfo(query) {
    const menuList = await this.ctx.app.utils.allMenuBasicInfoList;
    return menuList;
  }
}

module.exports = MenuService;
