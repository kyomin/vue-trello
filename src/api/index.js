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
      // 객체 안에 일치하는 키와 매핑되어 값이 할당된다.
      const { status } = error.response
      console.log('request status : ', status)
      console.log('error.response : ', error.response)

      if (status === UNAUTHORIZED) return onUnauthorized()
      throw error.response
    })
}

export const setAuthInHeader = token => {
  // axios를 통한 모든 요청을 날릴 때, 헤더에 토큰 정보를 실을 수 있도록 셋팅한다.
  axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : null
}

export const board = {
  fetch () {
    return request('get', '/boards')
  }
}

export const auth = {
  login (email, password) {
    return request('post', '/login', { email, password })
  }
}
