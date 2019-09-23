'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app
  router.get('/admin/mall/getShopList', middleware.verifyToken(), controller.admin.mall.shop.getShopList)
  router.get('/common/checkLoginState', controller.common.user.checkLoginState)
  router.post('/common/uploader', controller.common.file.uploaderByQiniu)
  router.post('/admin/mall/login', controller.admin.mall.user.login)
  router.post('/admin/mall/registered', controller.admin.mall.user.registered)
}
