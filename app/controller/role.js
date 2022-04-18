const Controller = require('egg').Controller;

class RoleController extends Controller {
    async add() {
        this.ctx.body = await this.ctx.service.role.add(this.ctx.request.body);
    }

    async remove() {
        this.ctx.body = await this.ctx.service.role.remove(this.ctx.params.id);
    }

    async update() {
        this.ctx.body = await this.ctx.service.role.update(
            this.ctx.params.id,
            this.ctx.request.body
        );
    }

    async index() {
        this.ctx.body = await this.ctx.service.role.findAll();
    }

    async findOne() {
        this.ctx.body = await this.ctx.service.role.findOne(this.ctx.params.id);
    }

    async find() {
        await this.ctx.service.role.increaseScanNumber(this.ctx.params.id);
        this.ctx.body = await this.ctx.service.role.find(this.ctx.params.id);
    }
}

module.exports = RoleController;
