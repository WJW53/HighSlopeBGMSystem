const Controller = require('egg').Controller;

/**
 * 增查时用户id就是url参数里的id
 * 改删时工位id就是url参数里的id
 */
class StationController extends Controller {
    async add() {
        this.ctx.body = await this.ctx.service.station.add(this.ctx.request.body);
    }

    async remove() {
        this.ctx.body = await this.ctx.service.station.remove(this.ctx.params.id);//工位数据库id
    }

    async update() {
        this.ctx.body = await this.ctx.service.station.update(
            this.ctx.params.id,//工位数据库id
            this.ctx.request.body//工位新的数据
        );
    }

    async index() {
        console.log('this.ctx.request.body', this.ctx.request.body, 'this.ctx.query', this.ctx.query);
        this.ctx.body = await this.ctx.service.station.findAll(this.ctx.query);
    }

    async findOne() {
        this.ctx.body = await this.ctx.service.station.findOne(this.ctx.params.id);
    }

    async find() {
        await this.ctx.service.station.increaseScanNumber(this.ctx.params.id);
        this.ctx.body = await this.ctx.service.station.find(this.ctx.params.id);
    }

    async getAllCityInfo() {
        console.log('getAllCityInfoOOOOOOO');
        this.ctx.body = await this.ctx.service.station.getAllCityInfo(this.ctx.query);
    }
}

module.exports = StationController;
