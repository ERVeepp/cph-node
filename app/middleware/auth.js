const request = require('../utils/request')
module.exports = _ => {
  return async function auth(ctx, next) {
    // 获取authtoken
    const token = ctx.app.config.wwInfo.auth
    // console.log(token)
    console.log(!!token)
    // return await next();
    if (token) {
      console.log(1)
      // 如果auth过期，需要清除本地auth
      await next()
    } else {
      console.log(0)
      const ajaxData = ctx.app.config.wwInfo.userInfo
      console.log(ajaxData)
      const auth = await request({
        url: 'https://iam.cn-east-3.myhuaweicloud.com/v3/auth/tokens?nocatalog=true',
        method: 'post',
        data: ajaxData
      })
      console.log(auth)
      ctx.app.config.wwInfo.auth = auth
      await next();
    }
  }
};