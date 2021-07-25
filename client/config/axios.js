import axios from 'axios'
import { deviceDetect } from 'react-device-detect'

export const instance = axios.create({
  baseURL: process.env.BACKEND_SERVER,
  timeout: process.env.REQUEST_TIMEOUT,
})

instance.defaults.headers.common['device_info'] = JSON.stringify(
  deviceDetect(),
)

export function setAuthorizationToken(user) {
  if (user) {
    instance.defaults.headers.common.user_id = `${user.user_id}`
    instance.defaults.headers.common['Session-Token'] = `${user.session_token}`
    instance.defaults.headers.common.device_id = `${user.device_id}`
  } else {
    delete instance.defaults.headers.common.user_id
    delete instance.defaults.headers.common['Session-Token']
    delete instance.defaults.headers.common['Access-Token']
  }
}

// export const makeHttpRequest = (config) =>
//   axios
//     .request({
//       method: config.method || 'GET',
//       baseURL: config.baseURL ? config.baseURL : FRONTEND_BASE_URL,
//       url: config.url,
//       data: config.data,
//       headers: config.headers ? config.headers : {},
//       params: config.params,
//       timeout: process.env.REQUEST_TIMEOUT || 50000,
//       responseType: config.responseType ? config.responseType : 'json',
//     })
//     .then((res) => res)
//     .catch((err) => {
//       throw new Error(err)
//     })

export default instance
