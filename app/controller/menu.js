const Controller = require('egg').Controller;

class menuController extends Controller {
    async add() {
        this.ctx.body = await this.ctx.service.menu.add(this.ctx.request.body);
    }

    async remove() {
        this.ctx.body = await this.ctx.service.menu.remove(this.ctx.params.id);
    }

    async update() {
        this.ctx.body = await this.ctx.service.menu.update(
            this.ctx.params.id,
            this.ctx.request.body
        );
    }

    async index() {
        this.ctx.body = await this.ctx.service.menu.findAll(this.ctx.query);
    }

    async findOne() {
        this.ctx.body = await this.ctx.service.menu.findOne(this.ctx.params.id);
    }

    async find() {
        await this.ctx.service.menu.increaseScanNumber(this.ctx.params.id);
        this.ctx.body = await this.ctx.service.menu.find(this.ctx.params.id);
    }
}

module.exports = menuController;
