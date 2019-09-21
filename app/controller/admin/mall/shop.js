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
        const ret = await ctx.service.admin.mall.shop.getShopList()
        if (ret.errCode === 0) {
          ctx.body = configStatus({
            shop_list: ret.list
          })
          return
        }
        ctx.body = configStatus({}, 2000, ret.errStr)
      } catch (err) {
        console.log(err)
      }
    } catch (err) {
      // console.log(err.errors[0])
      const errInfo = err.errors[0]
      ctx.body = configStatus({}, 2000, `${errInfo.field} ${errInfo.message}`)
    }
  }
}

module.exports = ShopController
