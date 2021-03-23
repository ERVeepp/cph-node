const Service = require('egg').Service;

class globalService extends Service {
  async getProjectId(arr, name) {
    return arr.find(ele => {
      return (ele.name === name)
    }).id
  }
}

module.exports = globalService;