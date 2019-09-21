'use strict'

const Controller = require('egg').Controller
const configStatus = require('../../../utils/configStatus')

class CommonUserController extends Controller {
  /*
   * @desc: 登录
  */
  async login({ type }) {
    const { ctx } = this
    const rules = {
      phone: { type: 'string' },
      password: { type: 'string' }
    }
    try {
      await ctx.validate(rules, ctx.query)
      // 检验手机号合法性
      if (!/^1\d{10}$/.test(ctx.query.phone)) {
        ctx.body = configStatus({}, 2000, '请输入正确的手机号')
        return
      }
      try {
        console.log(ctx.service)
        const ret = await ctx.service.common.user.login({
          ...ctx.query,
          type
        })
        if (ret.errCode === 0) {
          ctx.body = configStatus({
            token: ret.token
          })
          return
        }
        ctx.body = configStatus({}, 2000, ret.errStr)
      } catch (err) {
        console.log(err)
      }
    } catch (err) {
      const errInfo = err.errors[0]
      ctx.body = configStatus({}, 2000, `${errInfo.field} ${errInfo.message}`)
    }
  }

  /*
  * @desc: 注册
  */
  async registered() {
    const { ctx } = this
    const rules = {
      phone: { type: 'string' },
      password: { type: 'string' }
    }
    try {
      await ctx.validate(rules, ctx.query)
      // 检验手机号合法性
      if (!/^1\d{10}$/.test(ctx.query.phone)) {
        ctx.body = configStatus({}, 2000, '请输入正确的手机号')
        return
      }
      try {
        const ret = await ctx.service.common.user.registered({
          ...ctx.query
        })
        if (ret.errCode === 0) {
          ctx.body = configStatus({
            token: ret.token
          })
          return
        }
        ctx.body = configStatus({}, 2000, ret.errStr)
      } catch (err) {
        console.log(err)
      }
    } catch (err) {
      const errInfo = err.errors[0]
      ctx.body = configStatus({}, 2000, `${errInfo.field} ${errInfo.message}`)
    }
  }
}

module.exports = CommonUserController
