const mongoose = require('mongoose');
const md5 = require('md5');
const fs = require('fs');
const path = require('path');

// monkey toJSON
const originToJSON = mongoose.Document.prototype.toJSON;
// 将_id转为id, 对前端更友好
mongoose.Document.prototype.toJSON = function (...args) {
  const obj = originToJSON.call(this, ...args);
  if (obj._id) {
    obj.id = obj._id;
    delete obj._id;
  }
  return obj;
};

const appId = '625d58940aa9a93f2c0771e1';//超级管理员--wjw的账户id

// app.js
class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  //初始化全量路由/菜单表信息
  async initMenuList() {
    const Menu = this.app.model.Menu;
    const count = await Menu.countDocuments();
    console.log('Menu已连接到数据库');
    if (!count) {
      await Menu.create(this.app.config.menuList);
      console.log('Menu初始化成功');
    }
  }

  // // 初始化管理员
  // async initAdmin() {
  //   const Admin = this.app.model.Admin;
  //   const count = await Admin.countDocuments();
  //   console.log('管理员已连接到数据库');
  //   if (!count) {
  //     this.app.config.admin.loginPwd = md5(this.app.config.admin.loginPwd);
  //     this.ctx.superAdmin = await Admin.create(this.app.config.admin);
  //     console.log('superAdminnnnnn', this.ctx.superAdmin);
  //     console.log('管理员初始化成功');
  //   }
  // }

  async initUser() {
    const User = this.app.model.User;
    const count = await User.countDocuments();
    console.log('User已连接数据库', count);
  }

  async initStation() {
    const Station = this.app.model.Station;
    const count = await Station.countDocuments();
    console.log('Station已连接数据库', count);
  }

  async initEquipment() {
    const Equipment = this.app.model.Equipment;
    const count = await Equipment.countDocuments();
    console.log('Equipment已连接数据库', count);
  }

  async initProject() {
    const Project = this.app.model.Project;
    const count = await Project.countDocuments();
    console.log('Project已连接数据库', count);
  }

  // // 初始化全局设置
  // async initSetting() {
  //   const Setting = this.app.model.Setting;
  //   const count = await Setting.countDocuments();
  //   if (!count) {
  //     await Setting.create({
  //       avatar: 'http://www.duyiedu.com/source/img/logo.png',
  //       siteTitle: '我的个人空间',
  //       github: 'https://github.com/DuYi-Edu',
  //       qq: '3263023350',
  //       qqQrCode:
  //         'http://www.duyiedu.com/source/img/%E5%B0%8F%E6%B8%A1%E5%BE%AE%E4%BF%A1%E4%BA%8C%E7%BB%B4%E7%A0%81.png',
  //       weixin: 'yh777bao',
  //       weixinQrCode:
  //         'http://www.duyiedu.com/source/img/%E5%85%AC%E4%BC%97%E5%8F%B7%E4%BA%8C%E7%BB%B4%E7%A0%81.png',
  //       mail: 'duyi@gmail.com',
  //       icp: '黑ICP备17001719号',
  //       githubName: 'DuYi-Edu',
  //       favicon: 'http://mdrs.yuanjin.tech/Fs4CDlC6mwe_WXLMIiXcmSJLHO4f',
  //     });
  //     console.log('全局设置初始化成功');
  //   }
  // }

  mkUpload() {
    const fs = require('fs');
    const path = require('path');
    try {
      fs.mkdirSync(path.resolve(__dirname, './app/public/upload'));
    } catch {
      // do nothing
    }
  }

  // 初始化头像
  initAvatars() {
    const allows = ['.png', '.gif', '.jpg', '.png', '.webp', '.bmp', '.svg'];
    const files = fs
      .readdirSync(path.resolve(__dirname, './app/public/avatar'))
      .filter((name) => allows.includes(path.extname(name).toLowerCase()))
      .map((name) => `${this.app.config.static.prefix}avatar/${name}`);
    console.log('avatars: ', files);
    this.app.config.avatars = files;
  }

  willReady() {
    this.initMenuList();

    // 初始化用户--超级管理员
    this.initUser();
    this.initStation();
    this.initEquipment();
    this.initProject();

    // // 初始化全局设置
    // this.initSetting();

    // 初始化上传目录
    this.mkUpload();

    // // 初始化关于我信息
    // this.initAbout();

    // 初始化头像数据
    this.initAvatars();
  }
}

module.exports = AppBootHook;
