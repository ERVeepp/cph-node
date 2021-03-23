/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1605854633793_1940';

  // add your middleware config here
  config.middleware = [
    'auth',
  ]


  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.wwInfo = {
    // 想要在这里存储全局变量，需要提前声明
    name: 'cn-east-3',
    auth: '',
    cph_endpoint: 'cph.cn-east-3.myhuaweicloud.com',
    project_id: '',
    server_id: [],
    phone_ids: [],
    phone_ids_arr: [],
    obs_name: '',
    tar_name: 'ww',
    userInfo: {
      "auth": {
        "identity": {
          "methods": [
            "password"
          ],
          "password": {
            "user": {
              "domain": {
                "name": ""
              },
              "name": "",
              "password": ""
            }
          }
        },
        "scope": {
          "project": {
            "name": "cn-east-3"
          }
        }
      }
    },
    
  }

  return {
    ...config,
    ...userConfig,
  };
};
