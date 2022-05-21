const Service = require('../core/BaseService');

class RoleService extends Service {
  async add(info) {
    if(Object.keys(info).includes('_id')){
      delete info._id;//防止改了_id;
    }
    return await this.ctx.model.Role.create(info);
  }

  async update(id, info) {
    if(Object.keys(info).includes('_id')){
      delete info._id;//防止改了_id;
    }
    await this.ctx.model.Role.updateOne({ _id: id }, { $set: info });
    return await this.find(id);
  }

  async remove(id) {
    await this.ctx.model.Role.remove({ _id: id });
    return true;
  }

  async find(id) {
    return await this.ctx.model.Role.findById(id);
  }

  async findAll(query) {
    const options = this.getPagerOptions(query);
    const { roleName, roleValue } = options;
    console.log('超级管理员查询所有权限最终options', options);

    /** 多字段模糊匹配分页查询 */
    const filter = {};
    if(roleName || roleValue){
      filter['$and'] = [];
      roleName && filter['$and'].push({ roleName: { $regex: roleName, $options: 'i' } });
      roleValue && filter['$and'].push({ roleValue: { $regex: roleValue, $options: 'i' } });
    }

    const total = await this.ctx.model.Role.countDocuments(filter);
    const result = await this.ctx.model.Role.find(filter)
      .skip((options.page - 1) * options.limit)
      .limit(options.limit);
    result.total = total;
    return result;
  }
}

module.exports = RoleService;
