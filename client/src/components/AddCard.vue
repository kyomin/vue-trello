<template>
  <div class="add-card">
    <form @submit.prevent="onSubmit">
      <input class="form-control" type="text" v-model="inputTitle" ref="inputText">
      <button class="btn btn-success" type="submit" :disabled="invalidInput" >Add Card</button>
      <a class="cancel-add-btn" href="" @click.prevent="$emit('close')">&times;</a>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['listId'],
  data () {
    return {
      inputTitle: ''
    }
  },
  computed: {
    invalidInput () {
      return !this.inputTitle.trim()
    }
  },
  mounted () {
    this.$refs.inputText.focus()
    this.setupClickOutside(this.$el)
  },
  methods: {
    ...mapActions([
      'ADD_CARD'
    ]),
    onSubmit () {
      console.log('Add Card Submit Called!!')

      // submit 시에 한 번 더 form 값 유효성 체크!
      if (this.invalidInput) return
      const {inputTitle, listId} = this
      const pos = this.newCardPos() // 추가 시에 동일한 pos 값으로 create 되는 것을 방지
      this.ADD_CARD({title: inputTitle, listId, pos})
        .finally(() => {
          this.inputTitle = ''
        })
    },
    newCardPos () {
      const curList = this.$store.state.board.lists.filter(l => l.id === this.listId)[0]
      if (!curList) return 65535 // 기본값인 경우

      const { cards } = curList
      if (!cards.length) return 65535 // 기본값인 경우

      return cards[cards.length - 1].pos * 2
    },
    setupClickOutside (el) { // 현재 컴포넌트 정보를 받고
      document.querySelector('body').addEventListener('click', e => {
        // 클릭한 부분이 컴포넌트 안에 없다면 닫아준다.
        if (el.contains(e.target)) {
          console.log('click inside')
          return
        }

        this.$emit('close')
      })
    }
  }
}
</script>

<style>
.add-card {
  padding: 10px;
  display: block;
  position: relative;
}
.add-card .cancel-add-btn {
  display: inline-block;
  margin-left: 10px;
  vertical-align: middle;
  text-decoration: none;
  color: #888;
  font-size: 24px;
}
.add-card .cancel-add-btn:hover,
.add-card .cancel-add-btn:focus {
  color: #666;
}
</style>
