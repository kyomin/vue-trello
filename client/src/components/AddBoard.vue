<template>
  <Modal>
    <div slot="header">
      <h2>
        Create new board
        <a href="" class="modal-default-button"
          @click.prevent="SET_IS_ADD_BOARD_CLICKED(false)">&times;</a>
      </h2>
    </div>
    <div slot="body">
      <form id="add-board-form"
        @submit.prevent="addBoard">
        <input class="form-control" type="text" v-model="input" ref="input">
      </form>
    </div>
    <div slot="footer">
      <button
        class="btn"
        :class="{'btn-success': valid}"
        type="submit"
        form="add-board-form"
        :disabled="!valid"
      >
        Create Board
      </button>
    </div>
  </Modal>
</template>

<script>
import Modal from './Modal.vue'

// Vuex가 제공하는 helper methods를 이용하면 함수처럼 사용 가능하다.
// 별도로 this.$store.commit, this.$store.dispatch를 명시하지 않아도 된다.
import { mapMutations, mapActions } from 'vuex'

export default {
  components: {
    Modal
  },
  data () {
    return {
      input: '',
      valid: false
    }
  },
  watch: {
    input (v) {
      this.valid = v.trim().length > 0
    }
  },
  mounted () {
    // 부모 컴포넌트로 마운트 됐을 때, 입력 바로 커서를 포커싱하기 위함.
    this.$refs.input.focus()
  },
  methods: {
    ...mapMutations([
      'SET_IS_ADD_BOARD_CLICKED'
    ]),
    ...mapActions([
      'ADD_BOARD',
      'FETCH_BOARDS'
    ]),
    addBoard () {
      this.SET_IS_ADD_BOARD_CLICKED(false)
      this.ADD_BOARD({title: this.input})
        .then(({id}) => {
          this.$router.push(`/b/${id}`)
        })
    }
  }
}
</script>

<style>

</style>
