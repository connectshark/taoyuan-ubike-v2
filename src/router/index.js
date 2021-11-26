const { createRouter, createWebHashHistory } = require('vue-router')
import Home from '../views/home.vue'

const history = createWebHashHistory()

const router = createRouter({
  history,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/bike',
      name: 'bike',
      component: () => import('../views/bike.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('../views/404.vue')
    },
  ]
})

export default router