import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/updaterealtor/:id',
    name: 'UpdateRealtor',
    component: () => import('../views/UpdateRealtor.vue')
  },
  {
    path: '/listrealtor',
    name: 'ListRealtor',
    component: () => import('../views/ListRealtor.vue')
  },
  {
    path: '/newrealtor',
    name: 'NewRealtor',
    component: () => import('../views/NewRealtor.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
