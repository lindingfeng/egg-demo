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
          }, 'lindf', { expiresIn: 60*10 })
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
}

module.exports = UserService
