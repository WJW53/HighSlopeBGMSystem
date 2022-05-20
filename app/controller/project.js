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
        // 噢！ get请求的参数中的动态变量在ctx.params, get后面的参数在ctx.query中; post和put请求的参数都在请求体里ctx.request.body!!
        console.log('this.ctx.request.body', this.ctx.request.body, 'this.ctx.query', this.ctx.query);
        this.ctx.body = await this.ctx.service.project.findAll(this.ctx.query);
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
