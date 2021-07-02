import Vue from 'vue'
import Vuex from 'vuex'
import * as api from '../api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isAddBoardClicked: false
  },
  mutations: {
    SET_IS_ADD_BOARD_CLICKED (state, toggle) {
      state.isAddBoardClicked = toggle
    }
  },
  actions: {
    ADD_BOARD (_, {title}) {
      return api.board.create(title)
    }
  }
})

export default store
