const Controller = require('egg').Controller;

class UserController extends Controller {
    async add() {
        this.ctx.body = await this.ctx.service.user.add(this.ctx.request.body);
    }

    async remove() {
        this.ctx.body = await this.ctx.service.user.remove(this.ctx.params.id);
    }

    async update() {
        this.ctx.body = await this.ctx.service.user.update(
            this.ctx.params.id,
            this.ctx.request.body
        );
    }

    async index() {
        this.ctx.body = await this.ctx.service.user.findAll();
    }

    async findOne() {
        console.log(this.ctx.params, this.ctx.query);
        this.ctx.body = await this.ctx.service.user.findOne(this.ctx.params.id);
    }

    async find() {
        await this.ctx.service.user.increaseScanNumber(this.ctx.params.id);
        this.ctx.body = await this.ctx.service.user.find(this.ctx.params.id);
    }
}

module.exports = UserController;
