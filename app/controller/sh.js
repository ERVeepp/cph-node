'use strict';
const Controller = require('egg').Controller;
class LoginController extends Controller {

  async adbConnectSh() {
    const { ctx } = this;
    const res = await this.service.sh.adbConnectSh()
    ctx.body = res
  }
}

module.exports = LoginController;
