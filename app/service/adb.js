const Service = require('egg').Service;
const request = require('../utils/request');
class adbService extends Service {
  async test() {
    const res = await this.service.cph.getCphPhones()
    const { cph_endpoint, project_id, tar_name, server_id} = res
    return res
  }

  async filesSearchShare() {
    const { cph_endpoint, project_id, tar_name, server_id} = await this.service.cph.getCphPhones()
    const res = await request({
      url: `https://${cph_endpoint}/v1/${project_id}/cloud-phone/servers/share-files?path=/${tar_name}&server_ids=${server_id}`,
      method: 'get'
    })
    return res
  }

  async filesSearchCphJobs(job_id) {
    
    const res = await request({
      url: `https://${cph_endpoint}/v1/${project_id}/cloud-phone/jobs/${job_id}`,
      method: 'get'
    })
    return res
  }

  async phoneCommandsInstallApkFn(pkg_name) {
    const { cph_endpoint, project_id, obs_name, tar_name, server_id, phone_ids} = this.app.config.wwInfo
    const ajaxData = {
      "command": "install",
      "content": `-t -r obs://cph-test-ww/${obs_name}/${pkg_name}`,
      "phone_ids": phone_ids
    }
    const res = await request({
      url: `https://${cph_endpoint}/v1/${project_id}/cloud-phone/phones/commands`,
      method: 'post',
      data: ajaxData
    })
    const msg = await this.service.globalFn.heartbeatListenerJob(`https://${cph_endpoint}/v1/${project_id}/cloud-phone/jobs/${res.jobs[0].job_id}`)
    console.log('install_success')
    return msg
  }

  async phoneCommandsInstallApks() {
    const { cph_endpoint, project_id, obs_name, tar_name, server_id, phone_ids} = await this.service.cph.getCphPhones()
    const apkArr = [
      // 'Postern_v3.1.3_en.apk',
      // 'ESFileExplorer-V4.2.2.9.2.apk',
      // 'Coolapk-10.5.3-2009271_sign.apk',
      // 'chrome-87-0-4280-66.apk',
      // 'UCBrowser_V13.1.6.1096_android_pf145.apk',
    ]
    let res = {}
    for await (const apk of apkArr) {
      res = await this.phoneCommandsInstallApkFn(apk)
    }
    this.body = res
  }

  async phoneCommandsPushApk() {
    const { cph_endpoint, project_id, obs_name, tar_name, server_id, phone_ids} = await this.service.cph.getCphPhones()
    // const buildState = await this.service.buildToTar.build(tar_name)
    // if (buildState) {
      // 上传到obs

      const ajaxData = {
        "command": "push",
        "content": `obs://cph-test-ww/${obs_name}/${tar_name}.tar`,
        "phone_ids": phone_ids
      }
      const res = await request({
        url: `https://${cph_endpoint}/v1/${project_id}/cloud-phone/phones/commands`,
        method: 'post',
        data: ajaxData
      })
      const msg = await this.service.globalFn.heartbeatListenerJob(`https://${cph_endpoint}/v1/${project_id}/cloud-phone/jobs/${res.jobs[0].job_id}`)
      return this.app.config.wwInfo
  }

  // 安装airtest app
  async phoneCommandsInstallApkForAirtest() {
    const { cph_endpoint, project_id, obs_name, tar_name, server_id, phone_ids} = await this.service.cph.getCphPhones()
    const ajaxData = {
      "command": "shell",
      "content": `pm install -r -g /${tar_name}/Test.apk`,
      "phone_ids": phone_ids
    }
    const res = await request({
      url: `https://${cph_endpoint}/v1/${project_id}/cloud-phone/phones/commands`,
      method: 'post',
      data: ajaxData
    })
    const msg = await this.service.globalFn.heartbeatListenerJob(`https://${cph_endpoint}/v1/${project_id}/cloud-phone/jobs/${res.jobs[0].job_id}`)
    return msg
  }

  // 执行airtest app
  async phoneCommandsRunApkForAirtest() {
    const { cph_endpoint, project_id, obs_name, tar_name, server_id, phone_ids} = await this.phoneCommandsInstallApkForAirtest()
    const ajaxData = {
      "command": "shell",
      // "content": `am start -n com.netease.open.airbase/org.kivy.android.PythonActivity`,
      "contnt": `am instrument -w com.netease.open.airbase/android.support.test.runner.AndroidJUnitRunner`,
      "phone_ids": phone_ids
    }
    const res = await request({
      url: `https://${cph_endpoint}/v1/${project_id}/cloud-phone/phones/commands`,
      method: 'post',
      data: ajaxData
    })
    const msg = await this.service.globalFn.heartbeatListenerJob(`https://${cph_endpoint}/v1/${project_id}/cloud-phone/jobs/${res.jobs[0].job_id}`)
    this.body = msg
    return res
  }

  // 给手机设置adid
  async setPhoneAdid() {
    
    const android_id = 123
    // 获取筛选到的手机的设备信息
    let ajaxData = {
      command: "shell",
      // content: `sed -i '4c <string name=\"adid_key\">30258e42-b0b8-47a5-b919-154479f9b8ff</string>' /data/data/com.google.android.gms/shared_prefs/adid_settings.xml`,
      content: `settings put secure android_id ${android_id}`,
      phone_ids: [...phone_ids]
    }
    // this.body = ajaxData
    const res = await request({
      url: `https://${cph_endpoint}/v1/${project_id}/cloud-phone/phones/commands`,
      method: 'post',
      data: ajaxData
    })
    const msg = await this.service.globalFn.heartbeatListenerJob(`https://${cph_endpoint}/v1/${project_id}/cloud-phone/jobs/${res.jobs[0].job_id}`)
    this.body = msg
    return res
  }
}

module.exports = adbService;