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
    /*
     * @desc: 配置egg-mysql
     * @doc: https://github.com/eggjs/egg-mysql
    */
    mysql: {
      client: {
        host: '132.232.35.229',
        port: '3306',
        user: 'root',
        password: 'wsjj1994',
        database: 'lin',
      },
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false,
    },
    /*
     * @desc: 配置egg-cors
     * @doc: https://github.com/eggjs/egg-cors
    */
    security: {
      csrf: {
        enable: false,
        ignoreJSON: true
      },
      domainWhiteList: ['*']
    },
    cors: {
      origin: '*',
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
    },
    /*
     * @desc: 配置egg-validate
     * @npm: https://www.npmjs.com/package/parameter
     * @gitHub: https://github.com/eggjs/egg-validate
    */
    validate: {
      // 重要：可将入参转为特定类型
      convert: true,
      /*
       * 重要：入参类型为int时，将空字符串，NaN，Null转换为未定义
       * 场景：入参类型为int时，客户端传参为空字符串，NaN，Null
      */
      // widelyUndefined: true,
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
