'use strict'

const Service = require('egg').Service

class ShopService extends Service {
  /*
   * @desc: 获取商品列表
  */
  async getShopList() {
    const { app } = this
    try {
      const list = await app.mysql.select('shop_list')
      list.forEach(ele => {
        ele.shop_banner = JSON.parse(ele.shop_banner)
      })
      return { errCode: 0, list }
    } catch (err) {
      return { errCode: 1, errStr: err.sqlMessage }
    }
  }
}

module.exports = ShopService
