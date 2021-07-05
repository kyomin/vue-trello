import { setAuthInHeader } from '../api'

const mutations = {
  // 액션의 LOGIN과 다른 점은 서버로의 API 호출은 하자 않고,
  // state 데이터를 직접 변이시키는 역할을 한다는 것이다.
  LOGIN (state, token) {
    if (!token) return
    state.token = token
    localStorage.setItem('token', token)
    setAuthInHeader(token)
  },
  LOGOUT (state) {
    state.token = null
    delete localStorage.token
    setAuthInHeader(null)
  },
  SET_IS_ADD_BOARD_CLICKED (state, toggle) {
    state.isAddBoardClicked = toggle
  },
  SET_BOARDS (state, boards) {
    state.boards = boards
  },
  SET_BOARD (state, board) {
    state.board = board
  }
}

export default mutations
