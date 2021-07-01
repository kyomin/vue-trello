<template>
  <nav class="header">
    <div class="header-logo">
      <router-link to="/">Home</router-link>
    </div>
    <div class="header-auth">
      <a href="" v-if="isAuth" @click.prevent="logout">Logout</a>
      <router-link v-else to="/login">Login</router-link>

    </div>
  </nav>
</template>

<script>
import { setAuthInHeader } from '../api'

export default {
  computed: {
    isAuth () {
      // 로컬스토리지를 실시간으로 감시하지 못한다.
      // 때문에, 브라우저의 로컬스토리지 값은 변경이 잘 일어나도
      // 뷰에서는 즉각적으로 인지하지 못한다.
      // 이는 지극히 정상이다.
      return !!localStorage.getItem('token')
    }
  },
  methods: {
    logout () {
      delete localStorage.token
      setAuthInHeader(null)
      this.$router.push('/login')
    }
  }
}
</script>

<style>
.header {
  flex: none;
  background-color: rgba(0,0,0,.15);
  height: 32px;
  padding: 4px;
}
.header a {
  display: block;
  height: 30px;
  line-height: 30px;
  text-decoration: none;
  color: rgba(255,255,255,.5);
}
.header-logo {
  position: absolute;
  left: 50%;
  top: 7px;
  margin-left: -30px;
  text-align: center;
  font-weight: bolder;
  font-size: 24px;
}
.header-logo a:hover,
.header-logo a:focus {
  color: rgba(255,255,255,.9);
}
.header-auth {
  position: absolute;
  right: 15px;
  top: 5px;
}
.header-auth a {
  border-radius: 2px;
  padding: 0 10px;
  background-color: rgba(255,255,255, .5);
  color: white;
  transition: all .3s;
}
.header-auth a:hover,
.header-auth a:focus {
  background-color: rgba(255,255,255, .3);
}
</style>
