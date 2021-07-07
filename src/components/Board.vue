<template>
  <div>
    <div class="board-wrapper">
      <div class="board">
        <div class="board-header">
          <span class="board-title">{{board.title}}</span>
        </div>
        <div class="list-section-wrapper">
          <div class="list-section">
            <div class="list-wrapper" v-for="list in board.lists" :key="list.pos">
              <List :data="list" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import List from './List.vue'
import dragula from 'dragula'
import 'dragula/dist/dragula.css'

export default {
  components: {
    List
  },
  data () {
    return {
      bid: 0,
      loading: false,
      dragulaCards: null
    }
  },
  computed: {
    ...mapState({
      board: 'board'
    })
  },
  created () {
    this.fetchData()
  },
  updated () {
    // drag & drop을 수행하기 위해서는 Board 컴포넌트의 자식 컴포넌트들이 모두 렌더링된 후에 수행해야 한다!
    // 자식 컴포넌트들이 다 마운트 되는 시점이 updated이다.
    if (this.dragulaCards) this.dragulaCards.destroy()

    this.dragulaCards = dragula([
      ...Array.from(this.$el.querySelectorAll('.card-list'))
    ])
      .on('drop', (el, wrapper, target, sibling) => {
        console.log('drop event triggered')
        // 라이브러리가 발생한 이벤트가 어떤 값들을 넘겨주는지 확인하기 위해서는 아래와 같이
        // debugger를 찍고, 브라우저에 뜨는 콘솔 창에서 위의 인자들을 찍어보면 된다.
        // debugger

        const targetCard = {
          id: el.dataset.cardId * 1,
          pos: 65535
        }

        // 위 아래로 어떤 카드들이 있는지
        let prevCard = null
        let nextCard = null

        Array.from(wrapper.querySelectorAll('.card-item'))
          .forEach((el, idx, arr) => {
            const cardId = el.dataset.cardId * 1

            // 배열을 순회하며 현재 drag & drop하려는 카드와 같은 원소를 찾는다.
            // 그 후, 앞 뒤 카드들의 정보를 get한다.
            if (cardId === targetCard.id) {
              prevCard = idx > 0 ? {
                id: arr[idx - 1].dataset.cardId * 1,
                pos: arr[idx - 1].dataset.cardPos * 1
              } : null // 현재 타겟이 첫 번째 위치라면 이전 카드는 없는 것으로 판단!

              nextCard = idx < arr.length - 1 ? {
                id: arr[idx + 1].dataset.cardId * 1,
                pos: arr[idx + 1].dataset.cardPos * 1
              } : null
            }
          })

        if (!prevCard && nextCard) targetCard.pos = nextCard.pos / 2 // 맨 앞에 있다면
        else if (prevCard && !nextCard) targetCard.pos = prevCard.pos * 2 // 맨 뒤에 있다면
        else if (prevCard && nextCard) targetCard.pos = (prevCard.pos + nextCard.pos) / 2 // 중간에 삽입된 거라면

        console.log('targetCard : ', targetCard)
        this.UPDATE_CARD(targetCard)
      })
  },
  methods: {
    ...mapActions([
      'FETCH_BOARD',
      'UPDATE_CARD'
    ]),
    fetchData () {
      this.loading = true
      this.FETCH_BOARD({id: this.$route.params.bid})
        .then(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style>
.board-wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
.board {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.board-header {
  flex: none;
  padding: 8px 4px 8px 8px;
  margin: 0;
  height: 32px;
  line-height: 32px;
}
.board-header input[type=text] {
  width: 200px;
}
.board-header-btn {
  border-radius: 4px;
  padding: 2px 10px;
  height: 30px;
  margin-bottom: 15px;
  display: inline-block;
  color: #fff;
}
.board-header-btn:hover,
.board-header-btn:focus {
  background-color: rgba(0,0,0,.15);
  cursor: pointer;
}
.board-title {
  font-weight: 700;
  font-size: 18px;
}
.show-menu {
  font-size: 14px;
  position: absolute;
  right: 15px;
}
.list-section-wrapper {
  flex-grow: 1;
  position: relative;
}
.list-section {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  padding: 0 10px;
}
.list-wrapper {
  display: inline-block;
  height: 100%;
  width: 272px;
  vertical-align: top;
  margin-right: 5px;
}
.card-item.gu-transit {
  background-color: #555 !important;
}
.card-item.gu-mirror {
  opacity: 1 !important;
  background-color: #fff !important;
  transform: rotate(3deg) !important;
}
</style>
