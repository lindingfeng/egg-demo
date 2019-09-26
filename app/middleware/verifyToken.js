const jwt = require('jsonwebtoken')
const configStatus = require('../../utils/configStatus')

/*
 * @Description: 检验用户token有效性
 * @Author: lindingfeng
 * @Date: 2019-09-10 20:04:57
*/
module.exports = options => {
  return async (ctx, next) => {
    if (ctx.query.token) {
      try {
        let ret = await jwt.verify(ctx.query.token, 'lindf')
        ctx.query.userId = ret.userId
        await next()
      } catch (err) {
        if (err.message === 'jwt expired') {
          ctx.body = configStatus({}, 1001, '未登录或token过期')
          return
        }
        if (err.message === 'invalid signature') {
          ctx.body = configStatus({}, 1001, '无效签名')
          return
        }
        ctx.body = configStatus({}, 1001, '解密用户信息失败')
      }
      return
    }
    ctx.body = configStatus({}, 1001, '未登录或token过期')
  }
}