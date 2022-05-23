'use strict';

exports.mongoose = {
  enable: true,
  package: 'egg-mongoose',
};

exports.validate = {
  enable: true,
  package: 'egg-validate',
};

// 跨域
exports.cors = {
  enable: true,
  package: 'egg-cors'
}

//redis缓存
exports.sessionRedis = {
  enable: true,
  package: 'egg-session-redis',
},
exports.redis = {
  enable: true,
  package: 'egg-redis',
}

// exports.static = {
//   enable: true,
//   package: "egg-static",
// };
