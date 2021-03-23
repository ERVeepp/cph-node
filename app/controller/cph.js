'use strict';
const Controller = require('egg').Controller;
class LoginController extends Controller {

  async getProjects() {
    const { ctx } = this;
    const res = await this.service.cph.getProjects()
    ctx.body = res
  }

  async getCphServers() {
    const { ctx } = this;
    const res = await this.service.cph.getCphServers()
    ctx.body = res
  }

  async getCphPhones() {
    const { ctx } = this;
    const res = await this.service.cph.getCphPhones()
    ctx.body = res
  }

  async getHandleCphPhones() {
    const { ctx } = this;
    const res = await this.service.cph.getHandleCphPhones()
    ctx.body = res
  }

  async batchResetPhone() {
    const { ctx } = this;
    const res = await this.service.cph.batchResetPhone()
    ctx.body = res
  }
}

module.exports = LoginController;
