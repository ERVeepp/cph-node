const axios = require('axios')
// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
  maxContentLength: 'Infinity',
  maxBodyLength: 'Infinity'
})

// request interceptor
service.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    // console.log(config.headers['Content-Type'])
    if (this.auth) {
      config.headers['X-Auth-Token'] = this.auth
    }
    return config
  },
  error => {
    // do something with request error
    // console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    if (response) {
      if (response.config.url.includes('auth/tokens')) {
        if (response.status === 201) {
          this.auth = response.headers['x-subject-token']
        }
        return response.headers['x-subject-token']
      } else {
        return response.data
      }
    }
  },
  error => {
    // console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

module.exports = service
