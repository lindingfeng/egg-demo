const qiniu = require('qiniu')

/*
 * @description: 判断数据类型是否为数组
 * @author: lindingfeng
 * @date: 2019-08-02 23:09:03
*/
const isObject = (data) => {
  return Object.prototype.toString.call(data) === '[Object Object]'
}

/*
 * @description: 判断数据类型是否为数组
 * @author: lindingfeng
 * @date: 2019-08-02 23:09:03
*/
const isArray = (data) => {
  return Array.isArray(data)
}

/*
 * @Description: 生成随机字符串
 * @Author: lindingfeng
 * @Date: 2019-08-28 14:50:47
*/
const buildRamStr = (len = 8) => {
  let str = ''
  const someStr = [
    'a','b','c','d','e','f','g','h','i','j','k',
    '0','1','2','3','4','5','6','7','8','9',
    'A','B','C','D','E','F','G','H','I','J','K'
  ]
  for (let i=0; i<len; i++) {
    let idx = Math.ceil(Math.random() * someStr.length - 1)
    str += someStr[idx]
  }
  return str
}

/*
 * @description: 七牛云上传
 * @author: lindingfeng
 * @date: 2019-08-29 22:57:32
*/
const uploadUseQiniu = (bucket = 'static', readableStream) => {
  return new Promise((resolve, reject) => {

    // Access Key 和 Secret Key
    qiniu.conf.ACCESS_KEY = '07cNA0MRmRdC0saj02AeoG_UJOwUSlkonrFWP_EK'
    qiniu.conf.SECRET_KEY = '4WPSaPhzGe9Cjmh1os8rwZ6dUYVz8NgxDRXuk2mN'

    // 要上传的空间
    const config = new qiniu.conf.Config()
    config.zone = qiniu.zone.Zone_z2

    // 上传到七牛后保存的文件名
    const key = ''

    // 构建上传策略函数
    const putPolicy = new qiniu.rs.PutPolicy({
      scope: bucket
    })
    const token = putPolicy.uploadToken()

    // 构造上传函数
    const formUploader = new qiniu.form_up.FormUploader(config)
    const extra = new qiniu.form_up.PutExtra()
    formUploader.putStream(token, key, readableStream, extra,
      (respErr, respBody, respInfo) => {
        if (respErr) {
          reject(respErr)
        }
        if (respInfo.statusCode == 200) {
          // console.log(respBody)
          resolve(respBody)
        } else {
          reject(respBody)
        }
      }
    )
  })
}

module.exports = {
  isObject,
  isArray,
  buildRamStr,
  uploadUseQiniu
}
