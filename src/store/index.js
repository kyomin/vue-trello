import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isAddBoardClicked: false
  },
  mutations: {
    SET_IS_ADD_BOARD_CLICKED (state, toggle) {
      state.isAddBoardClicked = toggle
    }
  }
})

export default store
