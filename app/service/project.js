const Service = require('../core/BaseService');
const project = require('../model/project');

class ProjectService extends Service {
  async add(info) {
// TODO: 记得加校验
    info._user_ = this.ctx.user._id;//是这个用户下的工位
    console.log('正在添加该项目', info);
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

  async findAll(body) {
    const options = this.getPagerOptions(body);
    const { projectNo, projectName, stationName, equipmentName } = options;
    console.log('项目查询最终options', options);

    /** 多字段模糊匹配分页查询 */
    const filter = {
      _user_: options._user_
    };
    if(projectNo || projectName || stationName || equipmentName){//因为若都没值的话, 代表不要这些查询参数, 直接通过user_id全查
      filter['$and'] = [];
      projectNo && filter['$and'].push({ projectNo: { $regex: projectNo, $options: 'i' } });
      projectName && filter['$and'].push({ projectName: { $regex: projectName, $options: 'i' } });
      stationName && filter['$and'].push({ stationName: { $regex: stationName, $options: 'i' } });
      equipmentName && filter['$and'].push({ equipmentName: { $regex: equipmentName, $options: 'i' } });
    }

    const total = await this.ctx.model.Project.countDocuments(filter);
    const data = await this.ctx.model.Project.find(filter)
      .skip((options.page - 1) * options.limit)
      .limit(options.limit);
      // .sort('createTime')
      // .populate('', '');
    return {
      result: {
        result: data,
        total,
      }
    };
  }
}

module.exports = ProjectService;
