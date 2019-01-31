const BaseController = require('./base')
const md5 = require('md5')

class UserController extends BaseController {
    async signup() {
        let { ctx } = this;
        let username = ctx.request.body.username;
        // 这块的密码现在采取的是明文， 稍后会对这块的面进行加密处理
        let password = md5(ctx.request.body.password);
        let email = ctx.request.body.email;
        let user = {
            username,
            password,
            email
        }
        try {
            await ctx.model.User.create(user);
            this.success('注册成功')
        } catch(error) {
            this.error(error)
        }
    };
    async signin() {
        let { ctx } = this;
        let username = ctx.request.body.username;
        let password = md5(ctx.request.body.password);
        let user = {
            username,
            password
        }
        try {
            // 这块的密码应该进行处理 不应该现在在前端
            let result = await ctx.model.User.findOne(user)
            if (result){
                // 如果登录成功了 写入session会话
                // 下次使用ctx.session.user 是否为null来判断当前用户是否登录
                ctx.session.user = result;
                this.success({result});
            } else {
                this.error('用户名或密码错误')
            }
        }catch(error) {
            this.error(error)
        }
    };
    // 登出
    async signout() {
        let { ctx } = this;
        ctx.session.user = null;
        this.success('登出成功');
    }
}

module.exports = UserController