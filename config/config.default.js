const path = require('path');

// 用于加密的秘钥
exports.keys = 'high_slope-server_1619356153210_1238';

// 初始化的管理员信息
exports.admin = {
  loginId: 'wjw',
  loginPwd: '123456',
  name: '超级管理员',
};

// 启动后监听的端口号
exports.cluster = {
  listen: {
    port: 27017,
  },
};

// 中间件配置
exports.middleware = ['responseFomatter'];//格式化消息体
exports.responseFomatter = {
  ignore: ['/static', '/res'],
};

// mongoose
exports.mongoose = {
  url: 'mongodb://localhost/HighSlope',
  options: {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useNewUrlParser: true,
  },
};

// 自定义错误处理
const constErrorMsg = {
  401: '未登录，或登录已过期',
  404: '服务器没有对应的资源',
  500: '服务器内部错误',
  406: '验证错误',
};
exports.onerror = {
  all(err, ctx) {
    ctx.logger.error(err); // 记录日志

    // 设置响应内容
    // 设置正确的code值
    let code = +err.code || ctx.status;
    let msg = err.message || constErrorMsg[code];
    // 设置正确的msg值
    ctx.set('content-type', 'application/json');
    ctx.status = 200;
    if (code === 500) {
      msg = constErrorMsg[code];
    }

    ctx.body = JSON.parse(JSON.stringify({
      code,
      message: msg,
      result: null,
    }));
  },
};

// 关闭csrf
exports.security = {
  csrf: {
    enable: false,
  },
  // domainWhiteList: [ 'http://localhost:3100' ],
  domainWhiteList: [ '*' ],
};

exports.cors = {
  origin: '*',
  allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
},

// validate
exports.validate = {
  enable: true,
  package: 'egg-validate',
};

// static
exports.static = {
  prefix: '/static/',
  maxAge: 2 * 365 * 24 * 60 * 60, // 缓存两年
};

// multipart for uploaders
exports.multipart = {
  fileSize: '2mb', // max size 2mb
  whitelist: [
    // images
    '.jpg',
    '.jpeg', // image/jpeg
    '.png', // image/png, image/x-png
    '.gif', // image/gif
    '.bmp', // image/bmp
    '.wbmp', // image/vnd.wap.wbmp
    '.webp',
    '.tif',
    'svg',
  ],
  mode: 'file',
  tmpdir: path.resolve(__dirname, '../app', './public', 'upload_temp'),
};

// 评论、留言的限制
exports.messageLimit = {
  // 60秒内可以请求3次，如果到达3次，将在300秒内无法再次请求，超过次数会响应错误消息：您的操作过于频繁，请稍后再试
  duration: 60,
  times: 3,
  message: '您的操作过于频繁，请稍后再试',
  limit: 300,
};

exports.redis = {
  client: {
    host: process.env.EGG_REDIS_HOST || '127.0.0.1',
    port: process.env.EGG_REDIS_PORT || 6379,
    password: process.env.EGG_REDIS_PASSWORD || '',
    db: process.env.EGG_REDIS_DB || '0',
  },
}
