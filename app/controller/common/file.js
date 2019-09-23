'use strict'

const Controller = require('egg').Controller
const { uploadUseQiniu } = require('../../../utils')
const fs = require('mz/fs')
const configStatus = require('../../../utils/configStatus')

class CommonFileController extends Controller {
  /*
   * @desc: 七牛云上传（支持多图片上传）
  */
  async uploaderByQiniu() {
    const { ctx } = this
    let arr = []
    // 获取上传文件集合
    const files = ctx.request.files
    for (let i = 0; i < files.length; i++) {
      // 创建可读流
      const readableStream = fs.createReadStream(files[i].filepath)
      try {
        let ret = await uploadUseQiniu('static', readableStream)
        arr.push({
          name: files[i].fieldname,
          link: `http://s1.lindf.com/${ret.key}`
        })
      } catch (err) {
        console.log(err)
        break
      }
    }
    if (arr.length) {
      ctx.response.body = configStatus({
        list: arr
      })
      return
    }
    ctx.response.body = configStatus({}, 1002, '上传失败')
  }
}

module.exports = CommonFileController
