import Vue from 'vue'
import App from './App'
// import router from './router'

Vue.config.productionTip = false

const Login = { template: '<div>Login Page</div>' }

const routes = {
  '/': App,
  '/login': Login
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  computed: {
    VueComponent () {
      return routes[window.location.pathname] || { template: '<div>Page not found</div>' }
    }
  },
  render (h) {
    return h(this.VueComponent)
  }
})
