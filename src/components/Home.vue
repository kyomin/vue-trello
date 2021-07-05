<template>
  <div>
    <div class="home-title">Personal Boards</div>
    <div class="board-list" ref="boardList">
      <div class="board-item" v-for="b in boards" :key="b.id"
        :data-bgcolor="b.bgColor" ref="boardItem">
        <router-link :to="`/b/${b.id}`">
          <div class="board-item-title">{{b.title}}</div>
        </router-link>
      </div>
      <div class="board-item board-item-new">
        <a class="new-board-btn" href="" @click.prevent="SET_IS_ADD_BOARD_CLICKED(true)">
          Create new board...
        </a>
      </div>
    </div>
    <AddBoard
      v-if="isAddBoardClicked"
      @close="isAddBoardClicked=false"
    />
  </div>
</template>

<script>
import AddBoard from './AddBoard.vue'
import { mapMutations, mapState, mapActions } from 'vuex'

export default {
  components: {
    AddBoard
  },
  data () {
    return {
      loading: false,
      error: ''
    }
  },
  computed: {
    // 이렇게 함으로써 vuex store의 state 변수들을 마치 현 컴포넌트의 data처럼 쓸 수 있다.
    ...mapState({
      isAddBoardClicked: 'isAddBoardClicked',
      boards: 'boards'
    })
  },
  created () {
    console.log('Home Component Created !!!')
    this.fetchData()
  },
  updated () {
    this.$refs.boardItem.forEach(el => {
      el.style.backgroundColor = el.dataset.bgcolor
    })
  },
  methods: {
    // vuex store의 뮤테이션 및 액션을 함수처럼 호출해 쓸 수 있다.
    // 이제 현 컴포넌트에서 this 스코프로 접근해 사용할 수 있다.
    ...mapMutations([
      'SET_IS_ADD_BOARD_CLICKED'
    ]),
    ...mapActions([
      'FETCH_BOARDS'
    ]),
    fetchData () {
      this.loading = true
      this.FETCH_BOARDS()
        .finally(_ => {
          this.loading = false
        })
    }
  }
}
</script>

<style>
.home-title {
  padding: 10px;
  font-size: 18px;
  font-weight: bold;
}
.board-list {
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
}
.board-item {
  width: 23%;
  height: 100px;
  margin: 0 2% 20px 0;
  border-radius: 3px;
}
.board-item-new {
  background-color: #ddd;
}
.board-item a {
  text-decoration: none;
  display: block;
  width: 100%;
  height: 100%;
}
.board-item a:hover,
.board-item a:focus {
  background-color: rgba(0,0,0, .1);
  color: #666;
}
.board-item-title {
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  padding: 10px;
}
.board-item a.new-board-btn {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  height: 100px;
  width: inherit;
  color: #888;
  font-weight: 700;
}
</style>
