const sha1 = require('sha1')
const configStatus = require('../../utils/configStatus')

/*
 * @Description: 校验签名signature
 * @Author: lindingfeng
 * @Date: 2019-09-10 20:04:57
*/
module.exports = options => {
  return async (ctx, next) => {
    const rules = {
      pid: { type: 'string' },
      platform: { type: 'string' },
      version: { type: 'string' },
      timestamp: { type: 'string' },
      sign: { type: 'string' }
    }
    try {
      await ctx.validate(rules, ctx.query)
      let signString = ''
      const params = ctx.query
      const paramsKey = Object.keys(params).sort().filter(item => item !== 'sign')
      for (let i=0;i<paramsKey.length;i++) {
        signString += `${paramsKey[i]}${params[paramsKey[i]]}`
      }
      signString += 'lindingfeng'
      signString = sha1(signString)
      if (signString !== params.sign) {
        throw new Error('验签失败')
      }
      await next()
    } catch (err) {
      console.log(err)
      ctx.body = configStatus({}, 2000, '验签失败')
    }
  }
}