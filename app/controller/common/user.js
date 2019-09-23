'use strict'

const Controller = require('egg').Controller
const jwt = require('jsonwebtoken')
const configStatus = require('../../../utils/configStatus')

class CommonUserController extends Controller {
  /*
   * @desc: 检查登录态
  */
  async checkLoginState() {
    const { ctx } = this
    if (ctx.query.token) {
      try {
        let ret = await jwt.verify(ctx.query.token, 'lindf')
        console.log(ret)
        ctx.body = configStatus({ status: 1 })  
      } catch (err) {
        ctx.body = configStatus({ status: 2 })
      }
      return
    }
    ctx.body = configStatus({ status: 2 })
  }
}

module.exports = CommonUserController
