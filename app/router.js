/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  const middleware = app.middleware;
  const auth = middleware.auth();
  const passport = middleware.passport();
  const captcha = middleware.captcha();
  // const limit = middleware.limit();
  // const responseFomatter = middleware.responseFomatter();

  // app.middleware.limit()  可以在一些post请求中用上这个中间件


  /**
   * user 用户管理  TODO: 未完成,这里最后做吧, 根据前端的功能配合完成后端, 接口也要改
   * CRUD, 注册、登录、忘记密码、三方登录、认证、权限...
   */
  // router.post('/login', controller.user.add);
  // router.post('/api/userInfo', controller.user.add);
  // router.delete('/api/userInfo/:id', controller.user.remove);
  // router.put('/api/userInfo/:id', controller.user.update);
  // router.get('/api/userInfo', controller.user.index);
  router.get('/api/userInfo/:id', controller.user.findOne);
  

  /**
   * admin 管理员验证
   */
  router.post(
    '/api/admin/login',
    captcha,
    passport,
    controller.admin.login
  );
  router.get('/api/admin/whoami', auth, controller.admin.profile);
  router.put('/api/admin', auth, controller.admin.update);
  // 超级管理员得到所有的用户信息
  // router.get('/api/admin/getAllUsersInfo', auth, controller.admin.all);

  /**
   * setting 基础设置
   */
  router.get('/api/setting', controller.setting.index);
  router.put('/api/setting', auth, controller.setting.update);
  // router.put('/api/setting', controller.setting.update);


  //记得加入中间件噢, 基本都要加auth吧
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
  router.delete('/api/projectInfo/:id', auth, controller.project.remove);
  router.put('/api/projectInfo/:id', auth, controller.project.update);
  router.get('/api/projectInfo', auth, controller.project.index);
  // router.get('/api/projectInfo', auth, controller.project.findOne);


  /**
   * captcha 图片验证码 TODO: 后续整个手机验证码
   */
  router.get('/res/captcha', controller.captcha.index);


  /**
   * upload 文件上传的
   */
  router.post('/api/upload', auth, controller.upload.index);
  // router.post('/api/upload', controller.upload.index);
  router.post('/api/uploadURL', controller.upload.addUploadImageURL);
  router.get('/api/upload', controller.upload.findAllImageURL);
  router.delete('/api/upload/:id', controller.upload.removeImage);


  // // demo
  // router.post('/api/project', auth, controller.demo.add);
  // // router.post('/api/project', controller.demo.add);
  // router.put('/api/project/:id', auth, controller.demo.update);
  // // router.put('/api/project/:id', controller.demo.update);
  // router.delete('/api/project/:id', auth, controller.demo.remove);
  // // router.delete('/api/project/:id', controller.demo.remove);
  // router.get('/api/project', controller.demo.index);
};
