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
import {mapActions} from 'vuex'

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
    // this.setupClickOutside(this.$el)
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
      this.ADD_CARD({title: inputTitle, listId})
        .finally(() => {
          this.inputTitle = ''
        })
    },
    setupClickOutside (el) { // 현재 컴포넌트 정보를 받고
      console.log('el on mounted : ', el)
      document.querySelector('body').addEventListener('click', e => {
        console.log('el : ', el)
        console.log('e.target : ', e.target)
        // 클릭한 부분이 컴포넌트 안에 없다면 닫아준다.
        if (el.contains(e.target)) {
          console.log('click inside')
          return
        }

        // 1. Add a card 버튼을 눌르고, 컴포넌트가 마운트되면서 이벤트 등록과 동시에 클릭 이벤트 발생해 이 부분 항상 실행...
        // 2. 마운트 될 때마다 이벤트 등록하므로 등록된 이벤트 개수가 클릭해서 팝업 띄울 때마다 무한정 늘어남...
        console.log('click outside')
        // this.$emit('close')
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
