import axios from './http'

// export default function doLogin(parameter) {
//   return axios({
//     url: '/signin',
//     method: 'get',
//     params: parameter
//   }) 
// }

export default function doSignUp(parameter){
  return axios({
    url: '/signup',
    method: 'post',
    data: parameter
  }) 
}

// export default {
//   doLogin,
//   doSignUp
// }