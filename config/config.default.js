/* eslint valid-jsdoc: "off" */

'use strict'

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {
    mysql: {
      // 单数据库信息配置
      client: {
        // host
        host: '132.232.35.229',
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: 'wsjj1994',
        // 数据库名
        database: 'lin',
      },
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false,
    },
    jsonwebtoken: {},
    security: {
      csrf: {
        enable: false,
        ignoreJSON: true
      },
      domainWhiteList: ['*']
    },
    cors: {
      origin:'*',
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
    }
  }

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1568011375248_8178'

  // add your middleware config here
  config.middleware = []

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  }

  return {
    ...config,
    ...userConfig,
  }
}
