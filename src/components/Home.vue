<template>
  <div>
      Home
      <div>
        Board List:
        <div v-if="loading">Loading...</div>
        <div v-else>
          <div v-for="board in boards" :key="board.id">
            <pre>{{ board }}</pre>
          </div>
        </div>
        <ul>
          <li>
            <router-link to="/b/1">Board 1</router-link>
          </li>
          <li>
            <router-link to="/b/2">Board 2</router-link>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
import { board, setAuthInHeader } from '../api'

export default {
  data () {
    return {
      loading: false,
      boards: ''
    }
  },
  created () {
    console.log('Home component created')
    setAuthInHeader(localStorage.getItem('token'))
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.loading = true

      board.fetch()
        .then(data => {
          this.boards = data
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style>

</style>
