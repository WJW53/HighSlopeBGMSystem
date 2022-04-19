const Service = require('../core/BaseService');

class UserService extends Service {
  async login({username, password}) {
    console.log('node接收到前端代理过来的请求了!!', username, password);
    return await this.ctx.model.User.findOne({
      account: username,
      password: password,
      // loginPwd: md5(loginPwd),
    });
  }

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
    return await this.ctx.model.User.create(info);
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
    await this.ctx.model.User.updateOne({ _id: id }, { $set: info });
    return await this.find(id);
  }

  async remove(id) {
    await this.ctx.model.User.remove({ _id: id });
    return true;
  }

  async find(id) {
    return await this.ctx.model.User.findById(id);
  }

  async findOne(id) {
    return await this.ctx.model.User.findById(id);
  }

  async findAll() {
    return await this.ctx.model.User.find().sort('order');
  }
}

module.exports = UserService;
