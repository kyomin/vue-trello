import * as api from '../api'

/*
    액션의 첫 번째 인자는 context 객체이다.
    포함된 내용으로는 다음이 있다.

    dispatch : 액션 호출
    commit : 뮤테이션 호출
    state : store의 state 변수들 가져옴
*/
const actions = {
  // 로그인 같은 경우는 별도로 API 호출을 하므로 액션에서 정의해준다.
  // 서버로부터 받아온 데이터를 mutation으로 넘겨 데이터 변이를 위임한다.
  LOGIN ({ commit }, { email, password }) {
    return api.auth.login(email, password)
      .then(({ accessToken }) => commit('LOGIN', accessToken))
  },

  /*
    @@@@@@@@@@@@@@@@@@@@@@
        For Board Api Call
    @@@@@@@@@@@@@@@@@@@@@@
  */
  ADD_BOARD (_, { title }) {
    return api.board.create(title).then(data => data.item)
  },
  FETCH_BOARDS ({ commit }) {
    return api.board.fetch().then(data => {
      commit('SET_BOARDS', data.list)
    })
  },
  FETCH_BOARD ({ commit }, { id }) {
    return api.board.fetch(id).then(data => {
      commit('SET_BOARD', data.item)
    })
  },
  DELETE_BOARD (_, { id }) {
    return api.board.destroy(id)
  },
  UPDATE_BOARD ({ dispatch, state }, { id, title, bgColor }) {
    return api.board.update(id, { title, bgColor })
      .then(() => {
        dispatch('FETCH_BOARD', { id: state.board.id })
      })
  },

  /*
    @@@@@@@@@@@@@@@@@@@@@@
        For List Api Call
    @@@@@@@@@@@@@@@@@@@@@@
  */
  ADD_LIST ({ dispatch, state }, { title, boardId, pos }) {
    return api.list.create({ title, boardId, pos })
      .then(() => {
        dispatch('FETCH_BOARD', { id: state.board.id })
      })
  },
  UPDAATE_LIST ({ dispatch, state }, { id, pos, title }) {
    return api.list.update(id, { pos, title })
      .then(() => {
        dispatch('FETCH_BOARD', { id: state.board.id })
      })
  },

  /*
    @@@@@@@@@@@@@@@@@@@@@@
        For Card Api Call
    @@@@@@@@@@@@@@@@@@@@@@
  */
  ADD_CARD ({ dispatch, state }, { title, listId, pos }) {
    return api.card.create(title, listId, pos)
      .then(() => {
        // 카드 등록이 성공하게 되면 다시 보드 정보를 불러옴으로써 카드 리스트에 반영
        dispatch('FETCH_BOARD', { id: state.board.id })
      })
  },
  FETCH_CARD ({ commit }, { id }) {
    return api.card.fetch(id)
      .then(data => {
        commit('SET_CARD', data.item)
      })
  },
  UPDATE_CARD ({ dispatch, state }, { id, title, description, pos, listId }) {
    return api.card.update(id, { title, description, pos, listId })
      .then(() => {
        // 업데이트가 완료되면, 갱신된 내용을 화면에 다시 뿌리기 위함이다.
        dispatch('FETCH_BOARD', { id: state.board.id })
      })
  },
  DELETE_CARD ({ dispatch, state }, { id }) {
    return api.card.destroy(id)
      .then(() => {
        // 카드 삭제가 완료되면, 다시 보드 정보를 불러옴으로써 카드 리스트에 반영
        dispatch('FETCH_BOARD', { id: state.board.id })
      })
  }
}

export default actions
