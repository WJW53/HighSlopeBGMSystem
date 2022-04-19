const Service = require('../core/BaseService');

class EquipmentService extends Service {
  async add(info) {
    // this.validate(
    //   {}
    // );
    //TODO: 记得加校验
    info._user_ = this.ctx.user._id;
    return await this.ctx.model.Equipment.create(info);
  }

  async update(id, info) {
    //TODO: 记得加校验
    await this.ctx.model.Equipment.updateOne({ _id: id }, { $set: info });
    return await this.find(id);
  }

  async remove(id) {
    await this.ctx.model.Equipment.remove({ _id: id });
    return true;
  }

  async find(id) {
    return await this.ctx.model.Equipment.findById(id);
  }

  async findAll() {
    return await this.ctx.model.Equipment.find({_user_: this.ctx.user._id});
  }
}

module.exports = EquipmentService;
