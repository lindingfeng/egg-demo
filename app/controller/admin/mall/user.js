'use strict'

const Controller = require('egg').Controller
const configStatus = require('../../../../utils/configStatus')

class UserController extends Controller {
  /*
   * @desc: 登录
  */
  async login() {
    const { ctx } = this
    const rules = {
      phone: { type: 'string' },
      password: { type: 'string' }
    }
    try {
      // await ctx.validate(rules, ctx.request.body)
      await ctx.validate(rules, ctx.query)
      // 检验手机号合法性
      if (!/^1\d{10}$/.test(ctx.query.phone)) {
        ctx.body = configStatus({}, 2000, '请输入正确的手机号')
        return
      }
      try {
        const ret = await ctx.service.admin.mall.user.login({
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
        const ret = await ctx.service.admin.mall.user.registered({
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

  /*
   * @desc: 获取用户地址
  */
  async getUserAddress () {
    const { ctx } = this
    try {
      const ret = await ctx.service.admin.mall.user.getUserAddress(ctx.query.userId)
      if (ret.errCode === 0) {
        ctx.body = configStatus({
          address_list: ret.address_list || []
        })
        return
      }
      ctx.body = configStatus({}, 2000, ret.errStr)
    } catch (err) {
      console.log(err)
    }
  }

  /*
   * @desc: 获取用户地址By address_id
  */
  async getUserAddressById () {
    const { ctx } = this
    const rules = {
      address_id: {
        type: 'int',
        convertType: 'int',
      }
    }
    try {
      await ctx.validate(rules, ctx.query)
      try {
        const { userId, address_id } = ctx.query
        const ret = await ctx.service.admin.mall.user.getUserAddressById(userId, address_id)
        if (ret.errCode === 0) {
          ctx.body = configStatus({
            address_Info: ret.address_Info || {}
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
   * @desc: 添加地址
  */
  async addAddress () {
    const { ctx } = this
    const rules = {
      name: { type: 'string' },
      phone: { type: 'string' },
      area: { type: 'array' },
      detail: { type: 'string' },
      defaultAddress: {
        required: false,
        type: 'enum',
        default: 0,
        widelyUndefined: true,
        convertType: 'int',
        values: [0, 1]
      }
    }
    try {
      await ctx.validate(rules, ctx.request.body)
      const ret = await ctx.service.admin.mall.user.addAddress(ctx.query.userId)
      if (ret.errCode === 0) {
        ctx.body = configStatus({
          address_id: ret.address_id
        })
        return
      }
      ctx.body = configStatus({}, 2000, ret.errStr)
    } catch (err) {
      const errInfo = err.errors[0]
      ctx.body = configStatus({}, 2000, `${errInfo.field} ${errInfo.message}`)
    }
  }
}

module.exports = UserController
