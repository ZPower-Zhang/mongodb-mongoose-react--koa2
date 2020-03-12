import axios from 'axios'

const service = axios.create({
  // baseURL: 'http://localhost:3000/mockapi/', // api base_url
  baseURL: 'http://localhost:8000/api', // api base_url
  timeout: 1000 * 60, // 请求超时时间
  transformRequest: [function (data) {
    // Do whatever you want to transform the data
    let ret = ''
    for (const it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
  }]
})

const error = (err)=> {
  return err.response
}

service.interceptors.request.use(config => {
  console.info('config')
  console.info(config)
  return config
}, error)

service.interceptors.response.use((response) => {
  return response
}, error)

export default service