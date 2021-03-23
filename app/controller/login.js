'use strict';
const request = require('../utils/request')
const Controller = require('egg').Controller;
class LoginController extends Controller {
  async getAuthToken() {
    const { ctx } = this;
    const ajaxData = {
      "auth": {
        "identity": {
          "methods": [
            "password"
          ],
          "password": {
            "user": {
              "domain": {
                "name": "hw80449877"
              },
              "name": "jackie_hu",
              "password": "hu2130102"
            }
          }
        },
        "scope": {
          "project": {
            "name": "cn-east-3"
          }
        }
      }
    }
    const res = await request({
      url: 'https://iam.cn-east-3.myhuaweicloud.com/v3/auth/tokens?nocatalog=true',
      method: 'post',
      data: ajaxData
    })
    ctx.body = res
  }
}

module.exports = LoginController;
