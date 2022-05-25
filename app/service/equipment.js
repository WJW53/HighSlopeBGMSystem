const Service = require('../core/BaseService');

class EquipmentService extends Service {
  //记得加校验
  async add(info) {
    info._user_ = this.ctx.user._id;
    return await this.ctx.model.Equipment.create(info);
  }

  async update(id, info) {
    console.log('updateEquipment Info: ', info);//注意!! 这个info里面会被去掉_user_我也不知道为啥
    // await this.ctx.model.Equipment.updateOne({ _id: id }, { $set: info });// 这个的返回值, 不是那个最新的数据, 而是nModified: xx等字段;
    const newEquipment = await this.ctx.model.Equipment.findOneAndUpdate({ _id: id }, { $set: info }, { new: true });// 这个的返回值, 不是那个最新的数据, 而是nModified: xx等字段;
  //联动的要修改project表里的值
    const { equipmentNo, equipmentName, frequency, _user_ } = newEquipment;//
    console.log('updateEquipment', equipmentNo, equipmentName, frequency, _user_);
    await this.ctx.model.Project.updateMany(
      { _user_: _user_, equipmentNo, },
      { $set: { equipmentName, frequency } },
      { multi: true, new: true },
    );
    return newEquipment;
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
    const data = await this.ctx.model.Equipment.find(filter)
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

module.exports = EquipmentService;
