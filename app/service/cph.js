const Service = require('egg').Service;
const request = require('../utils/request');
class cphService extends Service {
  // 获取云手机项目id
  async getProjects() {
    const res = await request({
      url: 'https://iam.myhuaweicloud.com/v3/projects',
      method: 'get'
    })
    const name = this.app.config.wwInfo.name
    this.app.config.wwInfo.project_id = await this.service.globalData.getProjectId(res.projects, name)
    return this.app.config.wwInfo
  }
  // 获取云手机服务器列表
  async getCphServers() {
    const wwInfo = await this.getProjects()
    const cph_endpoint = wwInfo.cph_endpoint
    const project_id = wwInfo.project_id
    const resPhones = await request({
      url: `https://${cph_endpoint}/v1/${project_id}/cloud-phone/servers`,
      method: 'get'
    })
    this.app.config.wwInfo.server_id = resPhones.servers.map(ele => {
      return ele.server_id
    })
    return this.app.config.wwInfo
  }
  // 获取云手机实例列表
  async getCphPhones() {
    const that = this
    const wwInfo = await this.getCphServers()
    const { cph_endpoint, project_id } = wwInfo
    const { phones } = await request({
      url: `https://${cph_endpoint}/v1/${project_id}/cloud-phone/phones`,
      method: 'get'
    })
    this.app.config.wwInfo.phone_ids.splice(0)
    that.app.config.wwInfo.phone_ids = phones.map(ele => {
      return ele.phone_id
    })
    // for await (phone of phones) {}
    const data = phones.map(async ele => {
      let phone_id = ele.phone_id
      const getCphPhoneInfoUrl = `https://${cph_endpoint}/v1/${project_id}/cloud-phone/phones/${phone_id}`
      let phone_info = await this.service.globalFn.getCphPhone(getCphPhoneInfoUrl)
      return Object.assign({}, ele, phone_info)
    })
    this.app.config.wwInfo.phone_ids_arr = await Promise.all(data)
    return this.app.config.wwInfo
  }
  // ! https://support.huaweicloud.com/api-cph/cph_api_0504.html#cph_api_0504__table60021735
  // 处理手机关键信息，比如phone_ip, server_ip
  async getHandleCphPhones() {
    const wwInfo = await this.getCphPhones()
    const phones = wwInfo.phone_ids_arr.map(ele => {
      let obj = {}
      obj['phone_name'] = ele.phone_name
      obj['phone_id'] = ele.phone_id
      const phone_info = ele.access_infos.find(o => {
        return o.type === 'adb'
      })
      obj['phone_ip'] = phone_info.phone_ip
      obj['server_ip'] = phone_info.server_ip
      obj['listen_port'] = phone_info.listen_port
      obj['access_port'] = phone_info.access_port
      return obj
    })
    return phones
  }
  // 重置手机
  async batchResetPhone() {
    const wwInfo = await this.getCphPhones()
    // 获取筛选到的手机的设备信息
    const phone_ids = wwInfo.phone_ids
    const arr = [...phone_ids]
    const data = await Promise.all(arr.map(async ele => {
      return ele = {
        phone_id: ele,
        property: await this.service.globalFn.getPhoneProperty()
      }
    }))
    let ajaxData = {
      image_id: "20100320201118f111211a20000003ac",
      phones: data
    }
    return ajaxData
    // const res = await request({
    //   url: `https://${cph_endpoint}/v1/${project_id}/cloud-phone/phones/batch-reset`,
    //   method: 'post',
    //   data: ajaxData
    // })
    // const msg = await this.service.globalFn.heartbeatListenerJob(`https://${cph_endpoint}/v1/${project_id}/cloud-phone/jobs/${res.jobs[0].job_id}`)
    // this.body = msg
    // return res
  }
}

module.exports = cphService;