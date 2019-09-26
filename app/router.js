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
  router.get('/admin/mall/getAddressList', middleware.verifyToken(), controller.admin.mall.user.getUserAddress)
  router.get('/admin/mall/getAddressInfo', middleware.verifyToken(), controller.admin.mall.user.getUserAddressById)
  router.post('/admin/mall/addAddress', middleware.verifyToken(), controller.admin.mall.user.addAddress)
}
