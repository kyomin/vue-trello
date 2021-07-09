import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Board from '../components/Board.vue'
import Card from '../components/Card.vue'
import NotFound from '../components/NotFound.vue'
import store from '../store'

Vue.use(VueRouter)

const requireAuth = (to, from, next) => {
  console.log('to : ', to)
  console.log('from : ', from)
  console.log('next : ', next)

  const loginPath = `/login?rPath=${encodeURIComponent(to.path)}`
  store.getters.isAuth ? next() : next(loginPath)
}

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Home, beforeEnter: requireAuth },
    { path: '/login', component: Login },
    {
      path: '/b/:bid',
      component: Board,
      beforeEnter: requireAuth,
      // 중첩 라우팅. 위의 경로 하위에 적용되는 컴포넌트이다.
      // 때문에, 이 컴포넌트가 그려질 부분을 router-view 태그로 상위 라우팅의 컴포넌트(여기선 Board 컴포넌트)에서 지정해줘야 한다.
      children: [
        { path: 'c/:cid', component: Card, beforeEnter: requireAuth }
      ]
    },
    { path: '*', component: NotFound }
  ]
})

export default router
