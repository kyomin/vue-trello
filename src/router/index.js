import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Board from '../components/Board.vue'
import Card from '../components/Card.vue'
import NotFound from '../components/NotFound.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    {
      path: '/b/:bid',
      component: Board,
      // 중첩 라우팅. 위의 경로 하위에 적용되는 컴포넌트이다.
      // 때문에, 이 컴포넌트가 그려질 부분을 router-view 태그로 상위 라우팅의 컴포넌트에서 지정해줘야 한다.
      children: [
        { path: 'c/:cid', component: Card }
      ]
    },
    { path: '*', component: NotFound }
  ]
})

export default router
