'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1548475290640_9478';

  // add your config here
  config.middleware = [];

  // mongoose
  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1/blog',
      options: { }
    }
  }

  // 关闭csrf
  config.security = {
    csrf: false,
    domainWhiteList: ['http://localhost:3000']
  }
  
  config.cors = {
    credentials: true
  };

  return config;
};
