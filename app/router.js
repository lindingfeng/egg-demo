'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app
  /*
   * @desc: client/mall
  */
  router.get('/client/mall/getShopList', middleware.verifyToken(), controller.client.mall.shop.getShopList)
  router.get('/common/checkLoginState', controller.common.user.checkLoginState)
  router.post('/common/uploader', controller.common.file.uploaderByQiniu)
  router.post('/client/mall/login', controller.client.mall.user.login)
  router.post('/client/mall/registered', controller.client.mall.user.registered)
  router.get('/client/mall/getAddressList', middleware.verifyToken(), controller.client.mall.user.getUserAddress)
  router.get('/client/mall/getAddressInfo', middleware.verifyToken(), controller.client.mall.user.getUserAddressById)
  router.post('/client/mall/addAddress', middleware.verifyToken(), controller.client.mall.user.addAddress)
  /*
   * @desc: admin/mall
  */
  router.post('/admin/mall/login', controller.admin.mall.user.login)  
  router.get('/admin/mall/getShopList', middleware.verifyToken(), controller.admin.mall.shop.getShopList)
  router.get('/admin/mall/getCategoryList', middleware.verifyToken(), controller.admin.mall.shop.getCategoryList)
}
