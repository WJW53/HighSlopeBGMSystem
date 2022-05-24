const Service = require('../core/BaseService');

class StationService extends Service {
  async add(info) {
    info._user_ = this.ctx.user._id;//是这个用户下的工位
    return await this.ctx.model.Station.create(info);
  }

  async update(id, info) {
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
    const data = await this.ctx.model.Station.find(filter)
      .skip((options.page - 1) * options.limit)
      .limit(options.limit);
    return {
      result: {
        result: data,
        total,
      }
    };
  }

  getAllCityInfo(params) {
    const cityList = this.ctx.app.config.cityOptions;
    console.log('cityList: ', cityList.length, typeof cityList);
    return cityList;
  }
}

module.exports = StationService;
