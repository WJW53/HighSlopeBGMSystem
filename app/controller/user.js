const { redis } = require('../../config/config.default');

const Controller = require('egg').Controller;

class UserController extends Controller {
    async login() {//登录 手机or账号密码or...
        console.log('loginWWWWWWWWWWW');
        this.ctx.body = await this.ctx.service.user.login(this.ctx.request.body);
    }

    async logout() {//注销token，清除redis等
        console.log('logoutTTTTTT');
        this.ctx.body = await this.ctx.service.user.logout(this.ctx.request.body);
    }

    //把验证码缓存到redis中，为了到时候验证注册/登录/忘记密码时的手机验证码;
    async getSMS(){
        console.log('getSMSSSSSSSSSSSS');
        const code = this.ctx.app.utils.randomCode(6);//生成6位数字随机验证码
        const mobile = this.ctx.query.mobile;//手机号
        console.log('短信验证码是: ', code);
        try{
           const success = await this.ctx.app.utils.sendCode(mobile, code);
            if(success){
                const expIn = 60 * 1440; // 如果5分钟不输入，就过期;  为了便于测试及答辩, 先设置为24hour
                await this.app.redis.set('vc-' + mobile, code, 'ex', expIn);
                this.ctx.body = '短信验证码已发送至其手机，请查收！';
            }else{
                this.ctx.body = '系统异常，短信验证码发送失败！';
            }
        }catch(e){
            console.error('错误！', e);
        }
    }

    async register() {//注册
        console.log('registerRRRRRRRRRRR');
        this.ctx.body = await this.ctx.service.user.register(this.ctx.request.body);
    }

    // async updateAvatar() {//
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
        console.log('superAdminFindAllUserInfoOOOOOOOOO');
        this.ctx.body = await this.ctx.service.user.findAll(this.ctx.query);
    }

    async getAllRoleList() {
        console.log('getAllRoleListTTTTTTTTTTTTTTTT');
        this.ctx.body = await this.ctx.service.role.findAll(this.ctx.query);
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
