const Service = require('../core/BaseService');

class ProjectService extends Service {
  async add(info) {
// TODO: 记得加校验
    info._user_ = this.ctx.user._id;//是这个用户下的工位
    return await this.ctx.model.Project.create(info);
  }

  async update(id, info) {
// TODO: 记得加校验
    console.log('正在修改该项目', id, info);
    await this.ctx.model.Project.updateOne({ _id: id }, { $set: info });
    return await this.find(id);
  }

  async remove(id) {
    await this.ctx.model.Project.remove({ _id: id });
    return true;
  }

  async find(id) {
    console.log('一个项目的多表查询: 项目、工位、设备');
    return await this.ctx.model.Project.findById(id);//.populate('stationNo').populate('equipmentNo');
  }

  async findAll() {
    console.log('多表查询所有项目，包括关联的工位、设备');
    return await this.ctx.model.Project.find({_user_: this.ctx.user._id});//.populate('stationNo').populate('equipmentNo');
  }
}

module.exports = ProjectService;
