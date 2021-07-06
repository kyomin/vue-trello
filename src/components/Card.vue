<template>
  <Modal class="modal-card">
    <div slot="header" class="modal-card-header">
      <div class="modal-card-header-title">
        <input class="form-control" type="text" :value="card.title" readonly>
      </div>
      <a class="modal-close-btn" href="" @click.prevent="onClose">&times;</a>
    </div>
    <div slot="body">
      <h3>Description</h3>
      <textarea
        class="form-control"
        cols="30"
        rows="3"
        placeholder="Add a more detailed description..."
        readonly
        v-model="card.description">
      </textarea>
    </div>
    <div slot="footer"></div>
  </Modal>
</template>

<script>
import Modal from './Modal.vue'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    Modal
  },
  computed: {
    ...mapState({
      card: 'card',
      board: 'board'
    })
  },
  created () {
    // 컴포넌트가 생성되면서 카드 정보 가져오기
    const id = this.$route.params.cid
    console.log('현재 클릭된 카드 ID : ', id)

    this.FETCH_CARD({id})
  },
  methods: {
    ...mapActions([
      'FETCH_CARD'
    ]),
    onClose () {
      this.$router.push(`/b/${this.board.id}`)
    }
  }
}
</script>

<style>
.modal-card .modal-container {
  min-width: 300px;
  max-width: 800px;
  width: 60%;
}
.modal-card-header-title {
  padding-right: 30px;
}
.modal-close-btn {
  position: absolute;
  top: 0px;
  right: 0px;
  font-size: 24px;
  text-decoration: none;
}
.modal-card-header {
  position: relative;
}
</style>
