const Controller = require('egg').Controller;

class UserController extends Controller {
    async login() {//登录 手机or账号密码or...
        console.log('loginWWWWWWWWWWW');
        this.ctx.body = await this.ctx.service.user.login(this.ctx.request.body);
    }

    async logout() {//TODO: 注销token，清除redis等
        console.log('logoutTTTTTT');
        this.ctx.body = await this.ctx.service.user.logout(this.ctx.request.body);
    }

    async register() {//注册
        console.log('registerRRRRRRRRRRR');
        this.ctx.body = await this.ctx.service.user.register(this.ctx.request.body);
    }

    // async updateAvatar() {//TODO:这要去调upload接口, 然后再调用this.updateBasicInfo
    //     console.log('updateAvatar');
    //     this.ctx.body = await this.ctx.service.user.updateAvatar(this.ctx.request.body);
    // }

    async resetPassword() {//重置密码
        console.log('resetPasswordDDDDDDDDD');
        this.ctx.body = await this.ctx.service.user.resetPassword(this.ctx.request.body);
    }

    async changePassword() {//修改密码
        console.log('changePasswordCCCCCDDDD');
        this.ctx.body = await this.ctx.service.user.changePassword(this.ctx.request.body);
    }

//=============================================================================================
    async add() {
        this.ctx.body = await this.ctx.service.user.add(this.ctx.request.body);
    }

    async remove() {
        this.ctx.body = await this.ctx.service.user.remove(this.ctx.params.id);
    }

    async update() {
        console.log('updateBasicInfoOOOOOOOOO');
        // TODO: 防止有account, _id等字段的更新
        this.ctx.body = await this.ctx.service.user.update(
            this.ctx.params.id,
            this.ctx.request.body
        );
    }

    async index() {
        this.ctx.body = await this.ctx.service.user.findAll();
    }

    async findOne() {
        console.log(this.ctx.params, this.ctx.query);//params路由上的动态参数, query是路由上带的参数以及请求体里的body
        this.ctx.body = await this.ctx.service.user.findOne(this.ctx.params.id);
    }

    async whoami() {
        console.log('whoamiIIIIIII', this.ctx.user);
        this.ctx.body = await this.ctx.service.user.findOne(this.ctx.user._id);
    }

    async find() {
        await this.ctx.service.user.increaseScanNumber(this.ctx.params.id);
        this.ctx.body = await this.ctx.service.user.find(this.ctx.params.id);
    }
}

module.exports = UserController;
