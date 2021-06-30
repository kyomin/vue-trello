/*
    API 호출 커스터마이징 모듈!

    API 호출을 외부 라이브러리인 axios만을 이용하면 의존성이 커진다.
    직접 앱의 API 호출 부분을 모듈화하여 커스터마이징해 사용하는 것이 좋다.
*/
import axios from 'axios'
import router from '../router'

const DOMAIN = 'http://localhost:3000'
const UNAUTHORIZED = 401
const onUnauthorized = () => {
  router.push('/login')
}

const request = (method, url, data) => {
  return axios({
    method,
    url: DOMAIN + url,
    data
  })
    .then(result => result.data)
    .catch(error => {
      console.error('error response', error.response)
      console.error('error type', typeof (error))
      console.error('error properties', Object.keys(error))

      // 객체 안에 일치하는 키와 매핑되어 값이 할당된다.
      const { status } = error.response

      if (status === UNAUTHORIZED) return onUnauthorized()
      throw Error(error)
    })
}

export const board = {
  fetch () {
    return request('get', '/boards')
  }
}
