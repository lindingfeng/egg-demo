'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app
  // router.get('/api/getShopList', middleware.verifyToken(), controller.shop.getShopList)
  router.get('/admin/mall/getShopList', controller.admin.mall.shop.getShopList)
  router.post('/admin/mall/login', controller.admin.mall.user.login)
  router.post('/admin/mall/registered', controller.admin.mall.user.registered)
}
