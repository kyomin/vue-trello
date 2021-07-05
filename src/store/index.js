import Vue from 'vue'
import Vuex from 'vuex'
import * as api from '../api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isAddBoardClicked: false,
    boards: [], // 보드 리스트 데이터도 뷰엑스 스토어에서 관리한다.
    token: null
  },
  getters: {
    isAuth (state) {
      return !!state.token
    }
  },
  mutations: {
    SET_IS_ADD_BOARD_CLICKED (state, toggle) {
      state.isAddBoardClicked = toggle
    },
    SET_BOARDS (state, boards) {
      state.boards = boards
    },
    // 액션의 LOGIN과 다른 점은 서버로의 API 호출은 하자 않고,
    // state 데이터를 직접 변이시키는 역할을 한다는 것이다.
    LOGIN (state, token) {
      if (!token) return
      state.token = token
      localStorage.setItem('token', token)
      api.setAuthInHeader(token)
    },
    LOGOUT (state) {
      state.token = null
      delete localStorage.token
      api.setAuthInHeader(null)
    }
  },
  actions: {
    ADD_BOARD (_, {title}) {
      return api.board.create(title)
    },
    FETCH_BOARDS ({commit}) {
      return api.board.fetch().then(data => {
        commit('SET_BOARDS', data.list)
      })
    },
    // 로그인 같은 경우는 별도로 API 호출을 하므로 액션에서 정의해준다.
    // 서버로부터 받아온 데이터를 mutation으로 넘겨 데이터 변이를 위임한다.
    LOGIN ({commit}, {email, password}) {
      return api.auth.login(email, password)
        .then(({accessToken}) => commit('LOGIN', accessToken))
    }
  }
})

// 기본적으로 애플리케이션이 구동될 때,
// 브라우저의 로컬스토리지에서 토큰 정보를 읽어와 로그인 처리를 한다.
const { token } = localStorage
store.commit('LOGIN', token)

export default store
