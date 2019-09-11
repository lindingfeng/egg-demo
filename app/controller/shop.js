'use strict'

const Controller = require('egg').Controller
const configStatus = require('../../utils/configStatus')

class ShopController extends Controller {
  /*
   * @desc: 获取商品列表
  */
  async getShopList() {
    const { ctx } = this
    // const token = jwt.sign({ userId: 221520 }, 'lindf', { expiresIn: 60*10 })
    // const token = app.middleware.jsonwebtoken.verify(ctx.request.query.token, 'lindf')
    // 校验入参
    const rules = {
      // 入参为int类型，如果是其他类型，会尝试转为int类型（convertType: 'int'）
      pageIndex: { type: 'int', required: false, allowEmpty: false, default: 1, min: 1, convertType: 'int' },
      pageSize: { type: 'int', required: false, allowEmpty: true, default: 15, min: 1, convertType: 'int' }
    }
    try {
      await ctx.validate(rules, ctx.query)
      console.log(ctx.query)
      try {
        const list = await ctx.service.shop.getShopList()
        ctx.body = configStatus({
          category_list: {
            ...list
          }
        })
      } catch (err) {
        ctx.body = configStatus({}, (err.errno || 2000), (err.sqlMessage || '查询失败'))
      }
    } catch (err) {
      const errInfo = err.errors[0]
      ctx.body = configStatus({}, 1009, `${errInfo.field} ${errInfo.message}`)
    }
  }
}

module.exports = ShopController
