const sha1 = require('sha1')
const configStatus = require('../../utils/configStatus')

/*
 * @Description: 校验签名signature
 * @Author: lindingfeng
 * @Date: 2019-09-10 20:04:57
*/
module.exports = options => {
  return async (ctx, next) => {
    const closeCheckList = options.closeCheck || []
    let apiStr
    if (ctx.url.indexOf('?') !== -1) {
      apiStr = ctx.url.split('?')[0]
    } else {
      apiStr = ctx.url
    }
    let skipSign = false
    for (let i = 0; i < closeCheckList.length; i++) {
      if (apiStr.indexOf(closeCheckList[i]) !== -1) {
        skipSign = true
        break
      }
    }
    if (skipSign) {
      await next()
      return
    }
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
      ctx.body = configStatus({}, 2000, '验签失败')
    }
  }
}