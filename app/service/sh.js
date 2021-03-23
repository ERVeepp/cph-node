const Service = require('egg').Service;
const request = require('../utils/request');
const { spawn, exec, execFile } = require('child_process');
class shService extends Service {
  async adbConnectSh() {
    const shellPath = './shell/prod.sh'
    const phones = await this.service.cph.getHandleCphPhones()
    const phone_ip = phones.map(ele => {
      return `${ele.server_ip}:${ele.access_port}`
    })
    const phone_ip_str = phone_ip.toString()
    return new Promise((resolve, reject) => {
      execFile(shellPath, ['-D', phone_ip_str], function (err, stdout, stderr) {
        if (err) {
          console.log(stderr)
        } else {
          console.log(stdout)
          resolve(stdout)
        }
      })
    })
  }
}

module.exports = shService;