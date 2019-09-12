'use strict'

const Service = require('egg').Service

class ShopService extends Service {
  /*
   * @desc: 获取商品列表
  */
  async getShopList() {
    const { app } = this
    return await app.mysql.get('shop_category_list')
  }
}

module.exports = ShopService
