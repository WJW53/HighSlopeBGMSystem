const Service = require('../core/BaseService');
const project = require('../model/project');

const deleteThe_id = (info) => {
  delete info.id;
  delete info._id;
}

//处理项目关联工位设备的数据
const projPopulateSE = async (info, ctx) => {
  let newInfo = {...info, _user_: ctx.user._id};
  deleteThe_id(newInfo);
  const stationFilter = { 
    _user_: newInfo._user_, 
    stationNo: newInfo.station,//字段名是name, 但实际的值是对应的stationNo
  };
  const equipmentFilter = { 
    _user_: newInfo._user_, 
    equipmentNo: newInfo.equipment,//同理
  };

  const station = await ctx.model.Station.findOne(stationFilter);
  const equipment = await ctx.model.Equipment.findOne(equipmentFilter);
  const { stationNo, stationName, location } = station;
  const { equipmentNo, equipmentName, frequency } = equipment;
  const extraField = {
    stationNo,
    stationName,
    location,
    equipmentNo,
    equipmentName,
    frequency,
  }
  newInfo = {...newInfo, ...extraField};
  return newInfo;
}

//项目初次建立时，找到对应设备的所属地和采集频率; 并写入这个项目的对应的字段内; 更新时前端不暴露那几个字段到modal-form里
class ProjectService extends Service {
  async add(info) {
    const ctx = this.ctx;
    let finallyInfo = null;
    if(Array.isArray(info)){//批量增加
      const newInfoList = [];
      for(const item of info){
        const tempInfo = await projPopulateSE(item, ctx);
        newInfoList.push(tempInfo);
      }
      finallyInfo = newInfoList;
    }else if(info && typeof info === 'object'){
      finallyInfo = await projPopulateSE(info, ctx);
    }
    console.log('即将添加该项目', finallyInfo);
    return await ctx.model.Project.create(finallyInfo);
  }

  async update(id, info) {
// 记得加校验, 去掉关于设备、工位的字段等
    console.log('正在修改该项目', id, info);
    const newInfo = await projPopulateSE(info, this.ctx);
    return await this.ctx.model.Project.findOneAndUpdate({ _id: id }, { $set: newInfo }, { new: true });
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
    const { projectNo, projectName, stationName, equipmentName, frequency, projectLeader } = options;
    console.log('项目查询最终options', options);

    /** 多字段模糊匹配分页查询 */
    const filter = {
      _user_: options._user_
    };
    //因为若都没值的话, 代表不要这些查询参数, 直接通过user_id全查
    if(projectNo || projectName || stationName || equipmentName || frequency || projectLeader){
      filter['$and'] = [];
      projectNo && filter['$and'].push({ projectNo: { $regex: projectNo, $options: 'i' } });
      projectName && filter['$and'].push({ projectName: { $regex: projectName, $options: 'i' } });
      stationName && filter['$and'].push({ stationName: { $regex: stationName, $options: 'i' } });
      equipmentName && filter['$and'].push({ equipmentName: { $regex: equipmentName, $options: 'i' } });
      frequency && filter['$and'].push({ frequency: { $regex: frequency, $options: 'i' } });
      projectLeader && filter['$and'].push({ projectLeader: { $regex: projectLeader, $options: 'i' } });
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
