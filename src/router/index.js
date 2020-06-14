import Vue from 'vue'
import VueRouter from 'vue-router'
import Default from './../layouts/Default'
import Index from './../layouts/Index'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    component: Index,
    children: [
      { path: '/', name: 'index', component: () => import('./../views/Home.vue') }
    ]
  },
  {
    path: '',
    component: Default,
    children: [
      { path: '/perfil', name: 'profile', component: () => import('./../views/Profile.vue') },
      { path: '/:id', name: 'detail', component: () => import('./../views/Details.vue') },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
