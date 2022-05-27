const Controller = require('egg').Controller;

class EquipmentController extends Controller {
    async add() {
        this.ctx.body = await this.ctx.service.equipment.add(this.ctx.request.body);
    }

    async remove() {
        this.ctx.body = await this.ctx.service.equipment.remove(this.ctx.params.id);
    }

    async update() {
        this.ctx.body = await this.ctx.service.equipment.update(
            this.ctx.params.id,
            this.ctx.request.body
        );
    }

    async index() {
        console.log('this.ctx.request.body', this.ctx.request.body, 'this.ctx.query', this.ctx.query);
        this.ctx.body = await this.ctx.service.equipment.findAll(this.ctx.query);
    }

    async getAllEquipmentList() {
        this.ctx.body = await this.ctx.service.equipment.getAllEquipmentList(this.ctx.user._id);
    }

    async findOne() {
        this.ctx.body = await this.ctx.service.equipment.findOne(this.ctx.params.id);
    }

    async find() {
        await this.ctx.service.equipment.increaseScanNumber(this.ctx.params.id);
        this.ctx.body = await this.ctx.service.equipment.find(this.ctx.params.id);
    }
}

module.exports = EquipmentController;
