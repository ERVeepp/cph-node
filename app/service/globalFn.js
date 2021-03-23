const Service = require('egg').Service;
const request = require('../utils/request');
const csv = require('csvtojson')
class globalFnService extends Service {
  // 任务队列递归监听
  async heartbeatListenerJob(url) {
    const res = await request({
      url: url,
      method: 'get'
    })
    if (res.status === 1) {
      console.log(1)
      // 进行中
      return await this.heartbeatListenerJob(url)
    } else if (res.status === 2) {
      console.log(2)
      // 完成
      return res
    } else if (res.status === -1) {
      console.log(-1)
      // 失败
      return res
    }
  }
  // 获取单个云手机实例的具体属性
  async getCphPhone(url) {
    const res = await request({
      url: url,
      method: 'get'
    })
    return res
  }
  // 手机属性配置
  async getPhonePropertyJson() {
    const csvFilePath = './ym-auto-install/ym-devices-sample.csv'
    const data = await csv().fromFile(csvFilePath);
    return data
  }
  async randomPhoneProperty() {
    const arr = await this.getPhonePropertyJson()
    let index = parseInt(Math.random() * arr.length)
    return arr[index]
  }
  async getPhoneProperty() {
    const testData = {"ro.build.date.utc": "1484877235", "ro.serialno": "VWLRUWVC7H7SFIR4", "ro.product.name": "karbonn_K9_Viraat_4G", "ro.product.brand": "Karbonn", "ro.build.id": "MRA58K", "sys.prop.writeimei": "911535352198629", "ro.build.description": "full_vs6737m_35_m0-user 6.0 MRA58K 1484875301 test-keys", "ro.build.version.release": "6.0", "ro.product.board": "Karbonn", "ro.build.fingerprint": "Karbonn/karbonn_K9_Viraat_4G/karbonn_K9_Viraat_4G:6.0/MRA58K/1484875301:user/test-keys", "ro.product.model": "karbonn K9 Viraat 4G", "ro.build.product": "karbonn_K9_Viraat_4G", "ro.product.manufacturer": "Karbonn", "ro.build.host": "zhangjuntao-virtual-machine", "ro.bootimage.build.fingerprint": "Karbonn/karbonn_K9_Viraat_4G/karbonn_K9_Viraat_4G:6.0/MRA58K/1484875301:user/test-keys", "ro.hardware.dpi": "320", "ro.build.version.incremental": "1484875301", "ro.build.user": "zhangjuntao", "ro.product.device": "karbonn_K9_Viraat_4G"}
    let data = await this.randomPhoneProperty()
    // 生成随机长度字符串
    let randomStr = Math.random().toString(16).substring(2, 15)
    let phone_brand = `"${data['device_brand_name']}"`
    let phone_type = `"${data['device_type_name']}"`
    let os_version = `"${data['os_ver_name']}"`
    let wifi_name = `"wifi-${randomStr}"`
    // #设备字段梳理说明
    //    #华为 API 不支持
    //    #properties["ro.bootimage.build.date.utc"] = 1565745950   --------    已支持，修改ro.build.date.utc值，会自动同步修改ro.bootimage.build.date.utc
    //    #properties["ro.build.tags"] = ro_build_tags
    //    #properties["ro.build.type"] = ro_build_type
    //    #properties["ro.build.version.all_codenames"] = ro_build_version_all_codenames
    //    #properties["ro.build.version.codename"] = ro_build_version_codename
    //    #properties["ro.build.version.sdk"] = ro_build_version_sdk
    //    #properties["ro.product.model"] = ro_product_model [重要]    --------    已支持
    //    #properties["ro.product.brand"] = ro_product_brand [重要]    --------    已支持
    //    #properties["ro.product.cpu.abi"] = ro_product_cpu_abi
    //    #properties["ro.product.cpu.abilist"] = ro_product_cpu_abilist
    //    #properties["ro.product.cpu.abilist32"] = ro_product_cpu_abilist32 [重要]
    //    #properties["ro.product.cpu.abilist642"] = ro_product_cpu_abilist64 [重要]
    //    #properties["ro.sf.lcd_density"] = ro_sf_lcd_density [重要]   --------    已支持，修改ro.hardware.dpi，会自动修改ro.sf.lcd_density
    //    # properties["ro.serialno"] = ro_serialno   --------    已支持
    //    #screen_width[重要]   --------    已支持，修改ro.hardware.width值
    //    #screen_height[重要]   --------    已支持，修改ro.hardware.height值
    //    #dpi[重要]   --------    已支持，修改ro.hardware.dpi值
    //    #bottom_height[重要]  -----  需要解释具体含义或提供具体property
    //    #top_height[重要]  -----  需要解释具体含义或提供具体property
    //    # gaid[重要]   -------    当前可以使用adb shell命令修改：sed -ri "s|(adid_key\">)(.*)(</string)|\1${NEW_GAID}\3|" /data/data/com.google.android.gms/shared_prefs/adid_settings.xml
    //    #total_m[重要]  -----  需要解释具体含义或提供具体property
    //    #total_df[重要]  -----  需要解释具体含义或提供具体property
    //    #wifi_mac   --------    已支持，修改ro.com.cph.mac_address值
    //    #imei[重要]   --------    已支持，修改sys.prop.writeimei值
    //    #OAID，Android 10 上支持
    //    #device_name[重要]  -----  需要解释具体含义或提供具体property
    //    #user_agent[重要]
    //    #android_id[重要]
    //    # properties["ro.bootloader"]  = ""   --------    已支持
    //    # bluetooth_address
    //    # non_name  -----  需要解释具体含义或提供具体property
    //    #真机库没有
    //    # bluetooth_name
    //     properties["ro.build.description"] = ro_build_description
    //     properties["ro.build.fingerprint"] = ro_build_fingerprint
    //     properties["ro.build.host"] = ro_build_host
    //     properties["ro.build.id"] = ro_build_id
    //     properties["ro.build.product"] = ro_build_product
    //     properties["ro.build.user"] = ro_build_user
    //     properties["ro.build.version.incremental"] = ro_build_version_incremental
    //     properties["ro.build.version.release"] = ro_build_version_release
    //     properties["ro.product.manufacturer"] = ro_product_manufacturer
    //     properties["ro.product.name"] = ro_product_name
    //     properties["ro.product.board"] = ro_product_board
    //     properties["ro.product.device"] = ro_product_device
    //     properties_str = json.dumps(properties)
    let propertyData = {
      "persist.sys.locale": "en-IN",
      "phone_brand": data['device_brand_name'],
      "phone_type": data['device_type_name'],
      "os_version": data['os_ver_name'],
      "wifi_name": `wifi-${randomStr}`,
      // "build_id": "N2G47H",
      // "com.cph.sensor.vendor": "bcom",
      // "com.cph.system.app.install_time": "1230739475",
      // "gsm.sim.state": "NOT_READY",
      // "gsm.version.baseband": "",
      // "gsm_country": "a",
      // "gsm_number": "0",
      // "gsm_operator": "a",
      // "sim_country": "a",
      // "sim_number": "0",
      // "sim_operator": "a",
      // "ro.board.platform": "msm8937",
      // "ro.bootloader": "unknown",
      // "ro.bootimage.build.fingerprint": "Xiaomi/rolex/rolex:7.1.2/N2G47H/V10.2.1.0.NCCMIXM:user/release-keys",
      // "ro.build.fingerprint": "Xiaomi/rolex/rolex:7.1.2/N2G47H/V10.2.1.0.NCCMIXM:user/release-keys",
      // "ro.build.tags": "",
      // "ro.build.type": "",
      // "ro.build.version.all_codenames": "",
      // "ro.build.version.codename": "",
      // "ro.build.version.sdk": "",
      // "ro.build.product": "rolex",
      // "ro.build.host": "mi-server",
      // "ro.build.user": "builder",
      // "ro.build.version.incremental": "V10.2.1.0.NCCMIXM",
      // "ro.build.date.utc": "1230739303",
      // "ro.build.description": "rolex-user 7.1.2 N2G47H V10.2.1.0.NCCMIXM release-keys",
      // "ro.build.version.release": "7.1.2",
      // // 修改ro.build.date.utc值，会自动同步修改ro.bootimage.build.date.utc
      // "ro.build.date.utc": "",
      // "ro.build.display.id": "N2G47H",
      // "ro.build.id": "N2G47H",
      // "ro.build.flavor": "rolex-user",
      // "ro.baseband": "msm",
      // "ro.hardware": "qcom",
      // "ro.hardware.gpurenderer": "Adreno (TM) 418",
      // // dpi
      // // 修改ro.hardware.dpi，会自动修改ro.sf.lcd_density
      // "ro.hardware.dpi": "",
      // // screen_width
      // "ro.hardware.width": "",
      // // screen_height
      // "ro.hardware.height": "",
      // "ro.product.board": "msm8937",
      // "ro.product.manufacturer": "Xiaomi",
      // "ro.product.name": "rolex",
      // "ro.product.device": "rolex",
      // "ro.product.locale": "en-GB",
      // "ro.product.brand": "",
      // "ro.product.cpu.abi": "",
      // "ro.product.cpu.abilist32": "",
      // "ro.product.cpu.abilist642": "",
      // "ro.product.cpu.abi": "",
      // "ro.permission.changed": "1",
      // // device_name
      // "ro.product.model": "",
      // "ro.serialno": "",
    }
    return JSON.stringify(propertyData)
  }
}

module.exports = globalFnService;