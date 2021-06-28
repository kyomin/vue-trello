<template>
  <div id="app">
    {{ msg }}
    <!-- 라우터 경로에 따라 바뀔 레이아웃이 여기에 삽입된다. -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: '여기서부터 코드를 시작합니다!'
    }
  }
}
</script>

<style>
</style>
