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
export default {
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
    onSubmit () {
      console.log('Add Card Submit Called!!')
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
