'use strict'

const Controller = require('egg').Controller
const jwt = require('jsonwebtoken')

class ShopController extends Controller {
  /*
   * @Description: 获取商品列表
   * @Author: lindingfeng
   * @Date: 2019-09-09 16:23:22
  */
  async getShopList() {
    const { ctx, app } = this
    // const token = jwt.sign({ userId: 221520 }, 'lindf', { expiresIn: 60*10 })
    // const token = app.middleware.jsonwebtoken.verify(ctx.request.query.token, 'lindf')
    const list = await app.mysql.get('shop_category_list')
    ctx.body = {
      _data: {
        // token: token || '',
        // tip: '签名有效',
        category_list: {
          ...list
        }
      },
      _errCode: 0,
      _errStr: '成功'
    }
  }
}

module.exports = ShopController
