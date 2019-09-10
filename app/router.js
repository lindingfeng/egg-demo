'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { ctx, router, controller, middleware } = app
  router.get('/api/getShopList', middleware.verifyToken(), controller.shop.getShopList)
  // router.get('/api/getShopList', controller.shop.getShopList)
}
