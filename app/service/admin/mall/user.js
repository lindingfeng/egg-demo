'use strict'

const Service = require('egg').Service
const sha1 = require('sha1')
const jwt = require('jsonwebtoken')

class UserService extends Service {
  /*
   * @desc: 登录
  */
  async login({phone, password}) {
    try {
      const phoneRet = await this.app.mysql.get('user_list', { phone })
      if (phoneRet && phoneRet.phone) {
        if (phoneRet.password === sha1(password)) {
          const token = jwt.sign({
            userId: phoneRet.id
          }, 'lindf', { expiresIn: 60*100 })
          return { errCode: 0, token, errStr: '登录成功' }
        }
        return { errCode: 1, errStr: '密码错误' }
      }
      return { errCode: 1, errStr: '手机号未注册' }
    } catch (err) {
      return { errCode: 1, errStr: err.sqlMessage }
    }
  }

  /*
   * @desc: 注册
  */
  async registered({phone, password}) {
    try {
      const phoneRet = await this.app.mysql.get('user_list', { phone })
      if (phoneRet && phoneRet.phone) {
        return { errCode: 1, errStr: '手机号已注册' }
      }
      const insertRet = await this.app.mysql.insert('user_list', {
        phone,
        password: sha1(password),
        role: 0
      })
      if (insertRet.affectedRows === 1) {
        const userId = insertRet.insertId
        const token = jwt.sign({
          userId
        }, 'lindf', { expiresIn: 60*10 })
        return { errCode: 0, token, errStr: '注册成功' }
      }
      return { errCode: 1, errStr: '注册失败' }
    } catch (err) {
      return { errCode: 1, errStr: err.sqlMessage }
    }
  }

  /*
   * @desc: 获取用户地址
  */
  async getUserAddress(user_id) {
    try {
      const ret = await this.app.mysql.select('address_list', {
        where: { user_id: user_id },
        orders: [['is_default', 'desc']]
      })
      const res = ret || []
      
      res.forEach(ele => {
        ele.area = JSON.parse(ele.area)
      })
      return { errCode: 0, address_list: res || [], errStr: '获取地址列表成功' }
    } catch (err) {
      return { errCode: 1, errStr: err.sqlMessage }
    }
  }

  /*
   * @desc: 获取用户地址By address_id
  */
  async getUserAddressById(user_id, address_id) {
    try {
      const ret = await this.app.mysql.get('address_list', {
        user_id,
        id: address_id
      })
      if (ret) {
        ret.area = JSON.parse(ret.area)
      }
      return { errCode: 0, address_Info: ret || {}, errStr: '获取地址信息成功' }
    } catch (err) {
      return { errCode: 1, errStr: err.sqlMessage }
    }
  }

  /*
   * @desc: 添加用户地址
  */
  async addAddress(user_id) {
    const {
      name,
      phone,
      area,
      detail,
      defaultAddress
    } = this.ctx.request.body
    try {
      const ret = await this.app.mysql.insert('address_list', {
        user_id: user_id,
        name,
        phone,
        area: JSON.stringify(area),
        address: detail,
        is_default: defaultAddress
      })
      if (ret.affectedRows === 1) {
        return { errCode: 0, address_id: ret.insertId, errStr: '添加地址成功' }
      }
      return { errCode: 1, errStr: '添加地址失败' }
    } catch (err) {
      return { errCode: 1, errStr: err.sqlMessage }
    }
  }
}

module.exports = UserService
