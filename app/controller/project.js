const Controller = require('egg').Controller;

class ProjectController extends Controller {
    async add() {
        this.ctx.body = await this.ctx.service.project.add(this.ctx.request.body);
    }

    async remove() {
        this.ctx.body = await this.ctx.service.project.remove(this.ctx.params.id);
    }

    async update() {
        this.ctx.body = await this.ctx.service.project.update(
            this.ctx.params.id,
            this.ctx.request.body
        );
    }

    async index() {
        this.ctx.body = await this.ctx.service.project.findAll();
    }

    async findOne() {
        this.ctx.body = await this.ctx.service.project.findOne(this.ctx.params.id);
    }

    async find() {
        await this.ctx.service.project.increaseScanNumber(this.ctx.params.id);
        this.ctx.body = await this.ctx.service.project.find(this.ctx.params.id);
    }
}

module.exports = ProjectController;
