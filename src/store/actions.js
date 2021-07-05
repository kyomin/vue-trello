import * as api from '../api'

const actions = {
  // 로그인 같은 경우는 별도로 API 호출을 하므로 액션에서 정의해준다.
  // 서버로부터 받아온 데이터를 mutation으로 넘겨 데이터 변이를 위임한다.
  LOGIN ({commit}, {email, password}) {
    return api.auth.login(email, password)
      .then(({accessToken}) => commit('LOGIN', accessToken))
  },
  ADD_BOARD (_, {title}) {
    return api.board.create(title).then(data => data.item)
  },
  FETCH_BOARDS ({commit}) {
    return api.board.fetch().then(data => {
      commit('SET_BOARDS', data.list)
    })
  },
  FETCH_BOARD ({commit}, {id}) {
    return api.board.fetch(id).then(data => {
      commit('SET_BOARD', data.item)
    })
  }
}

export default actions
