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
      // 기존에는 이벤트를 발생시켜 부모에서 값 셋팅을 하도록 위임했다.
      // 하지만, 중앙 저장소가 있기 때문에 여기서 처리해도 된다.
      this.SET_IS_ADD_BOARD_CLICKED(false)
      this.ADD_BOARD({title: this.input})
        .then(() => {
          this.FETCH_BOARDS()
        })

      // 구지 이벤트를 발생시켜 부모인 Home 컴포넌트에서 데이터 fetch를 통해 refresh 시키지 않고,
      // 위와 같이 동기를 맞춰 여기서 처리한다.
      // this.$emit('submit')
    }
  }
}
</script>

<style>

</style>
