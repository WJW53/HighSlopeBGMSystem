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

  async findAll(body) {
    const options = this.getPagerOptions(body);
    const { equipmentNo, equipmentName, frequency } = options;
    console.log('设备查询最终options', options);

    /** 多字段模糊匹配分页查询 */
    const filter = {
      _user_: options._user_
    };
    if(equipmentNo || equipmentName || frequency){//因为若都没值的话, 代表不要这些查询参数, 直接通过user_id全查
      filter['$and'] = [];
      equipmentNo && filter['$and'].push({ equipmentNo: { $regex: equipmentNo, $options: 'i' } });
      equipmentName && filter['$and'].push({ equipmentName: { $regex: equipmentName, $options: 'i' } });
      frequency && filter['$and'].push({ frequency: { $regex: frequency, $options: 'i' } });
    }

    const total = await this.ctx.model.Equipment.countDocuments(filter);
    const result = await this.ctx.model.Equipment.find(filter)
      .skip((options.page - 1) * options.limit)
      .limit(options.limit);
      // .sort('-createDate')
      // .populate('blogId', 'id title');
    result.total = total;
    return result;
  }
}

module.exports = EquipmentService;
