<template>
  <div id="app">
    <Navbar />
    <!-- 라우터 경로에 따라 바뀔 레이아웃이 여기에 삽입된다. -->
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'app',
  components: { Navbar },
  data () {
    return {

    }
  }
}
</script>

<style>
</style>
