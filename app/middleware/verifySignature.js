const sha1 = require('sha1')
const configStatus = require('../../utils/configStatus')

/*
 * @Description: 校验签名signature
 * @Author: lindingfeng
 * @Date: 2019-09-10 20:04:57
*/
module.exports = options => {
  return async (ctx, next) => {
    const {
      pid,
      platform,
      version,
      timestamp,
      sign
    } = ctx.query
    const rules = {
      pid: { type: 'string' },
      platform: { type: 'string' },
      version: { type: 'string' },
      timestamp: { type: 'string' },
      sign: { type: 'string' }
    }
    try {
      await ctx.validate(rules, ctx.query)
      const queryString = `pid=${pid}&platform=${platform}&version=${version}&timestamp=${timestamp}`
      const signature = sha1(queryString)
      if (signature !== sign) {
        throw new Error('验签失败')
      }
      await next()
    } catch (err) {
      ctx.body = configStatus({}, 2000, '验签失败')
    }
  }
}