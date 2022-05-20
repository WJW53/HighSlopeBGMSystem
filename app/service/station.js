const Service = require('../core/BaseService');

class StationService extends Service {
  async add(info) {
    // this.validate(
    //   {
    //     name: 'string',
    //     url: {
    //       type: 'string',
    //       allowEmpty: true,
    //     },
    //     github: {
    //       type: 'string',
    //       allowEmpty: true,
    //     },
    //     description: {
    //       type: 'array',
    //       itemType: 'string',
    //     },
    //     order: 'int?',
    //     thumb: 'string',
    //   },
    //   info
    // );
    // info.order = +info.order;
    // if (isNaN(+info.order)) {
    //   info.order = 0;
    // }
    //TODO: 记得加校验
    
    info._user_ = this.ctx.user._id;//是这个用户下的工位
    return await this.ctx.model.Station.create(info);
  }

  async update(id, info) {
    // this.validate(
    //   {
    //     name: {
    //       type: 'string',
    //       required: false,
    //       allowEmpty: false,
    //     },
    //     url: {
    //       type: 'string',
    //       required: false,
    //       allowEmpty: true,
    //     },
    //     github: {
    //       type: 'string',
    //       required: false,
    //       allowEmpty: true,
    //     },
    //     description: {
    //       type: 'array',
    //       itemType: 'string',
    //       required: false,
    //     },
    //     order: {
    //       type: 'int',
    //       required: false,
    //     },
    //     thumb: {
    //       type: 'string',
    //       required: false,
    //       allowEmpty: false,
    //     },
    //   },
    //   info
    // );
    //TODO: 记得加校验
    await this.ctx.model.Station.updateOne({ _id: id }, { $set: info });
    return await this.find(id);
  }

  async remove(id) {
    await this.ctx.model.Station.remove({ _id: id });
    return true;
  }

  async find(id) {
    return await this.ctx.model.Station.findById(id);
  }

  async findAll(body) {
    const options = this.getPagerOptions(body);
    const { stationNo, stationName, location } = options;
    console.log('工位查询最终options', options);

    /** 多字段模糊匹配分页查询 */
    const filter = {
      _user_: options._user_
    };
    if(stationNo || stationName || location){//因为若都没值的话, 代表不要这些查询参数, 直接通过user_id全查
      filter['$and'] = [];
      stationNo && filter['$and'].push({ stationNo: { $regex: stationNo, $options: 'i' } });
      stationName && filter['$and'].push({ stationName: { $regex: stationName, $options: 'i' } });
      location && filter['$and'].push({ location: { $regex: location, $options: 'i' } });
    }

    const total = await this.ctx.model.Station.countDocuments(filter);
    const result = await this.ctx.model.Station.find(filter)
      .skip((options.page - 1) * options.limit)
      .limit(options.limit);
      // .sort('-createDate')
      // .populate('blogId', 'id title');
    result.total = total;
    return result;
  }
}

module.exports = StationService;
