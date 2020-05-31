'use strict'

const Controller = require('egg').Controller
const sha1 = require('sha1')
const { buildRamStr } = require('../../../utils')
const configStatus = require('../../../utils/configStatus')

class CommonThirdController extends Controller {
  /*
   * @desc: 检查登录态
  */
  async getWxSign() {
    const { ctx } = this
    const { url } = ctx.request.body
    if (url) {
      const access_token_data = await ctx.curl(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxa8c250966f9dda3f&secret=6b92e246287ab25b64aa58ca7e6cfe38`, { dataType: 'json' })
      const jsapi_ticket_data = await ctx.curl(`https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${access_token_data.data.access_token}&type=jsapi`, { dataType: 'json' })
      // console.log(access_token_data.data.access_token)
      // console.log(jsapi_ticket_data.data.ticket)
      const noncestr = buildRamStr(16)
      const timestamp = parseInt(new Date() / 1000)
      const signStr = `jsapi_ticket=${jsapi_ticket_data.data.ticket}&noncestr=${noncestr}&timestamp=${timestamp}&url=${url}`
      const signature = sha1(signStr)
      ctx.body = configStatus({
        signInfo: {
          appId: 'wxa8c250966f9dda3f',
          timestamp,
          nonceStr: noncestr,
          signature,
          url
        }
      })
      // let nonceStr = buildRamStr(16)
      // let timestamp = parseInt(new Date() / 1000)
      // let signature = ''
      // let access_token_data = await axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxa8c250966f9dda3f&secret=6b92e246287ab25b64aa58ca7e6cfe38`)
      // let jsapi_ticket_data = await axios.get(`https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${access_token_data.data.access_token}&type=jsapi`)
      // let signStr = `jsapi_ticket=${jsapi_ticket_data.data.ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url || 'https://www.lindf.com/jssdk.html'}`
      // // console.log(access_token_data.data)
      // // console.log(jsapi_ticket_data.data)
      // // console.log(signStr)
      // signature = sha1(signStr)
      // // console.log(signature)
      // ctx.response.body = configStatus({
      //   signInfo: {
      //     appId: 'wxa8c250966f9dda3f',
      //     timestamp,
      //     nonceStr,
      //     signature
      //   },
      // })
      // try {
      //   let ret = await jwt.verify(ctx.query.token, 'lindf')
      //   console.log(ret)
      //   ctx.body = configStatus({ status: 1 })  
      // } catch (err) {
      //   ctx.body = configStatus({ status: 2 })
      // }
      // return
    }
  }
}

module.exports = CommonThirdController
