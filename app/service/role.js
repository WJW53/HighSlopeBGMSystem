const Service = require('../core/BaseService');
const superAdminRoleId = '6288b2289f64bcb87f8a9ebc';
const handleIfSuperAdminRole = (info, ctx) => {
  if(info.roleValue === 'super' || info.id?.toString() === superAdminRoleId || info._id?.toString() === superAdminRoleId){
    ctx.app.error.throw(403, '禁止您对超级管理员角色的操作！');
  }
}

class RoleService extends Service {
  async add(info) {
    this.ctx.app.utils.deleteThe_id(info);
    console.log('createRole end_info: ', info);
    handleIfSuperAdminRole(info, this.ctx);
    if(!info.menuList.includes('PersonalCenter')){//个人中心是基础路由
      info.menuList.unshift('PersonalCenter', 'PersonalSetting', 'ChangePassword');
    }
    return await this.ctx.model.Role.create(info);
  }

  async update(id, info) {
    this.ctx.app.utils.deleteThe_id(info);
    
    console.log('updateRole end_info: ', info);
    handleIfSuperAdminRole(info, this.ctx);
    await this.ctx.model.Role.updateOne({ _id: id }, { $set: info });
    return await this.find(id);
  }

  async remove(id) {
    handleIfSuperAdminRole({id}, this.ctx);
    await this.ctx.model.Role.remove({ _id: id });
    return true;
  }

  async find(id) {
    return await this.ctx.model.Role.findById(id);//超级管理员可以查, 因为为了验证一些信息呢
  }

  async findAll(query) {
    const options = this.getPagerOptions(query);
    const { roleName, roleValue } = options;
    console.log('超级管理员查询所有权限最终options', options);

    /** 多字段模糊匹配分页查询 */
    const filter = {
      roleValue: {$ne: 'super'},
      _id: {$ne: superAdminRoleId},
    };
    if(roleName || roleValue){
      filter['$and'] = [];
      roleName && filter['$and'].push({ roleName: { $regex: roleName, $options: 'i' } });
      roleValue && filter['$and'].push({ roleValue: { $regex: roleValue, $options: 'i' } });
    }

    const total = await this.ctx.model.Role.countDocuments(filter);
    const data = await this.ctx.model.Role.find(filter)
      .skip((options.page - 1) * options.limit)
      .limit(options.limit);
    return {
      result: {
        result: data,
        total,
      }
    };
  }
}

module.exports = RoleService;
