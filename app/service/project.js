const Service = require('../core/BaseService');

class ProjectService extends Service {
  async add(info) {
    this.validate(
      {
        name: 'string',
        url: {
          type: 'string',
          allowEmpty: true,
        },
        github: {
          type: 'string',
          allowEmpty: true,
        },
        description: {
          type: 'array',
          itemType: 'string',
        },
        order: 'int?',
        thumb: 'string',
      },
      info
    );
    info.order = +info.order;
    if (isNaN(+info.order)) {
      info.order = 0;
    }
    return await this.ctx.model.Project.create(info);
  }

  async update(id, info) {
    this.validate(
      {
        name: {
          type: 'string',
          required: false,
          allowEmpty: false,
        },
        url: {
          type: 'string',
          required: false,
          allowEmpty: true,
        },
        github: {
          type: 'string',
          required: false,
          allowEmpty: true,
        },
        description: {
          type: 'array',
          itemType: 'string',
          required: false,
        },
        order: {
          type: 'int',
          required: false,
        },
        thumb: {
          type: 'string',
          required: false,
          allowEmpty: false,
        },
      },
      info
    );
    await this.ctx.model.Project.updateOne({ _id: id }, { $set: info });
    return await this.find(id);
  }

  async remove(id) {
    await this.ctx.model.Project.remove({ _id: id });
    return true;
  }

  async find(id) {
    console.log('一个项目的多表查询: 项目、工位、设备');
    return await this.ctx.model.Project.findById(id).populate('stationNo').populate('equipmentNo');
  }

  async findAll() {
    console.log('多表查询所有项目，包括关联的工位、设备');
    return await this.ctx.model.Project.find({}).sort('order').populate('stationNo').populate('equipmentNo');
  }
}

module.exports = ProjectService;
