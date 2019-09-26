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
     * @desc: 使用File模式上传文件时需配置下
    */
    multipart: {
      mode: 'file'
    },
    /*
     * @desc: 配置egg-mysql的options
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
     * @desc: 配置egg-cors的options
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
      // allowHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    },
    /*
     * @desc: 配置egg-validate的options
     * @npm: https://www.npmjs.com/package/parameter
     * @gitHub: https://github.com/eggjs/egg-validate
    */
    validate: {
      // 重要：可将入参尽可能转为type指定的类型
      convert: true,
      /*
       * 重要：入参类型为int时，将空字符串，NaN，Null转换为未定义
       * 场景：入参类型为int时，客户端传参为空字符串，NaN，Null
      */
      // widelyUndefined: true,
    },
    /*
     * @desc: 配置egg-static的options
    */
    static: {
      maxAge: 31536000
    },
    /*
     * @desc: 配置自定义中间件verifySignature的options
    */
    verifySignature: {},
    /*
     * @desc: 配置自定义中间件verifyToken的options
    */
    verifyToken: {}
  }

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1568011375248_8178'

  /*
   * @desc: 可全局配置中间件，每个请求都会经过这里配置的中间件
   * @tip: 配置的中间件按顺序执行，优先级最高，然后才是router定义的局部中间件
  */
  config.middleware = [
    'verifySignature'
  ]

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  }

  return {
    ...config,
    ...userConfig,
  }
}
