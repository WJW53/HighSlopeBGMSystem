/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  const middleware = app.middleware;
  const auth = middleware.auth();
  const passport = middleware.passport();
  const captcha = middleware.captcha();
  const superAdminAuth = middleware.superAdminAuth();
  // const limit = middleware.limit();
  // const responseFomatter = middleware.responseFomatter();

  // app.middleware.limit(); // TODO: 稍作修改, 然后在一些post请求中用上这个中间件


  /**
   * 把超级管理员放在超级管理员的表里，普通用户就是普通用户??----不要这样, 加个超级管理员鉴权中间件即可
   * 1. 超级管理员对所有用户的CRUD
   * 2. 用户对自己的信息获取
   */
  router.post('/api/userInfo', auth, superAdminAuth ,controller.user.add);// 增加一个用户
  router.delete('/api/userInfo/:id', auth, superAdminAuth , controller.user.remove);// 删除一个用户
  router.put('/api/userInfo/:id', auth, controller.user.update);// 某个用户基本信息的更新
  router.get('/api/userInfo', auth, superAdminAuth, controller.user.index);// superAdmin获取所有用户数据
  router.get('/api/userInfo/whoami', auth, controller.user.whoami);// 这行必须放上面, 否则whoami会被识别为下面的id
  router.get('/api/userInfo/:id', auth, controller.user.findOne);

  router.get('/api/allMenuBasicInfo', auth, superAdminAuth, controller.menu.getAllMenuBasicInfo);
  router.get('/api/userMenuInfo', auth,  controller.menu.index);

/**
 * 超级管理员对角色（含菜单权限）的CRUD
 */
  router.post('/api/roleInfo', auth, superAdminAuth ,controller.role.add);// 增加一个角色
  router.delete('/api/roleInfo/:id', auth, superAdminAuth , controller.role.remove);// 删除一个角色
  router.put('/api/roleInfo/:id', auth, superAdminAuth, controller.role.update);// 某个角色信息的更新
  router.get('/api/roleInfo', auth, superAdminAuth, controller.role.index);// superAdmin获取所有角色数据
  router.get('/api/roleInfo/:id', auth, superAdminAuth, controller.role.findOne);

  /**
   * 账号的注册、登录、退出、手机验证码、修改&重置密码
   */
  router.post('/api/register', controller.user.register);
  router.post('/api/login', auth, passport, controller.user.login);
  router.get('/api/logout', auth, controller.user.logout);//TOOD: 记得注销token等
  router.get('/api/getSMS', controller.user.getSMS);
  router.post('/api/changePassword', auth, controller.user.changePassword);//这个需要先鉴权啊, 确定你已经登录了
  router.post('/api/resetPassword', controller.user.resetPassword);
  

  /**
   * station 工位管理crud, 路径一致, 只需要控制method和参数即可
   */
  router.post('/api/stationInfo', auth, controller.station.add);
  router.delete('/api/stationInfo/:id', auth, controller.station.remove);
  router.put('/api/stationInfo/:id', auth, controller.station.update);
  router.get('/api/stationInfo', auth, controller.station.index);
  // router.get('/api/stationInfo/:id', auth, controller.station.findOne);


  /**
   * equipment 设备管理crud
   */
  router.post('/api/equipmentInfo', auth, controller.equipment.add);
  router.delete('/api/equipmentInfo/:id', auth, controller.equipment.remove);
  router.put('/api/equipmentInfo/:id', auth, controller.equipment.update);
  router.get('/api/equipmentInfo', auth, controller.equipment.index);
  // router.get('/api/equipmentInfo/:id', auth, controller.equipment.findOne);


  /**
   * project 项目管理crud
   */
  router.post('/api/projectInfo', auth, controller.project.add);
  router.delete('/api/projectInfo/:id', auth, controller.project.remove);//这个id是项目id
  router.put('/api/projectInfo/:id', auth, controller.project.update);//项目id
  router.get('/api/projectInfo', auth, controller.project.index);//算了，这里不用id了，因为这里id是用户id，怕和下面注释起来的搞混淆了
  // router.get('/api/projectInfo/:id', auth, controller.project.findOne);//这个id是项目id


  /**
   * captcha 图片验证码
   */
  router.get('/api/res/captcha', controller.captcha.index);


  /**
   * upload 文件上传的
   */
  router.post('/upload/avatar/:id', auth, controller.upload.uploadAvatar);
  // router.post('/upload', auth, controller.upload.index);
  router.post('/uploadURL', controller.upload.addUploadImageURL);
  router.get('/upload', controller.upload.findAllImageURL);
  router.delete('/upload/:id', controller.upload.removeImage);


  /** 以下暂时用不上, 是开发中思考的中间产物 */
  /**
   * admin 管理员验证
   */
  // router.post(
  //   '/api/admin/login',
  //   captcha,
  //   passport,
  //   controller.admin.login
  // );
  // router.get('/api/admin/whoami', auth, controller.admin.profile);
  // router.put('/api/admin', auth, controller.admin.update);
  // 超级管理员得到所有的用户信息
  // router.get('/api/admin/getAllUsersInfo', auth, controller.admin.all);

  /**
   * setting 基础设置
  //  */
  // router.get('/api/setting', controller.setting.index);
  // router.put('/api/setting', auth, controller.setting.update);
  // // router.put('/api/setting', controller.setting.update);

  // // demo
  // router.post('/api/project', auth, controller.demo.add);
  // // router.post('/api/project', controller.demo.add);
  // router.put('/api/project/:id', auth, controller.demo.update);
  // // router.put('/api/project/:id', controller.demo.update);
  // router.delete('/api/project/:id', auth, controller.demo.remove);
  // // router.delete('/api/project/:id', controller.demo.remove);
  // router.get('/api/project', controller.demo.index);
};
