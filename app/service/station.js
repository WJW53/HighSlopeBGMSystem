const Service = require('../core/BaseService');

class StationService extends Service {
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
    return await this.ctx.model.Station.create(info);
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

  async findAll() {
    return await this.ctx.model.Station.find().sort('order');
  }
}

module.exports = StationService;
