import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

// 기본적으로 애플리케이션이 구동될 때,
// 브라우저의 로컬스토리지에서 토큰 정보를 읽어와 로그인 처리를 한다.
const { token } = localStorage
store.commit('LOGIN', token)

export default store
