'use strict'

const Controller = require('egg').Controller
const { pageInfo, priceByPenny } = require('../../../../utils/validate')
const configStatus = require('../../../../utils/configStatus')

class ShopController extends Controller {
  /*
   * @desc: 获取商品列表
  */
  async getShopList() {
    const { ctx } = this
    // const token = jwt.sign({ userId: 221520 }, 'lindf', { expiresIn: 60*10 })
    // const token = app.middleware.jsonwebtoken.verify(ctx.request.query.token, 'lindf')
    // 校验入参
    // console.log('未校验:', ctx.query)
    const rules = {
      pageIndex: pageInfo(false),
      pageSize: pageInfo(false, 15),
      price: priceByPenny(false)
    }
    try {
      await ctx.validate(rules, ctx.query)
      // console.log('校验后:', ctx.query)
      try {
        const list = await ctx.service.admin.mall.shop.getShopList()
        ctx.body = configStatus({
          category_list: {
            ...list
          }
        })
      } catch (err) {
        ctx.body = configStatus({}, (err.errno || 2000), (err.sqlMessage || '查询失败'))
      }
    } catch (err) {
      console.log(err.errors[0])
      const errInfo = err.errors[0]
      ctx.body = configStatus({}, 1009, `${errInfo.field} ${errInfo.message}`)
    }
  }
}

module.exports = ShopController
