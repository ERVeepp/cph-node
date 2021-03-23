'use strict';
const Controller = require('egg').Controller;
class AdbController extends Controller {
  async test() {
    const { ctx } = this;
    const res = await this.service.adb.test()
    ctx.body = res
  }

  async filesSearchShare() {
    const { ctx } = this;
    const res = await this.service.adb.filesSearchShare()
    ctx.body = res
  }

  async phoneCommandsInstallApks() {
    const { ctx } = this;
    const res = await this.service.adb.phoneCommandsInstallApks()
    ctx.body = res
  }

  async phoneCommandsPushApk() {
    const { ctx } = this;
    const res = await this.service.adb.phoneCommandsPushApk()
    ctx.body = res
  }

  async phoneCommandsInstallApkForAirtest() {
    const { ctx } = this;
    const res = await this.service.adb.phoneCommandsInstallApkForAirtest()
    ctx.body = res
  }

  async phoneCommandsRunApkForAirtest() {
    const { ctx } = this;
    const res = await this.service.adb.phoneCommandsRunApkForAirtest()
    ctx.body = res
  }

  // 给手机设置adid
  async setPhoneAdid() {
    const { ctx } = this;
    const res = await this.service.adb.setPhoneAdid()
    ctx.body = res
  }
}

module.exports = AdbController;
