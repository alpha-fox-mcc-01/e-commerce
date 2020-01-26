import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: `Login`,
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/store',
    name: 'Store',
    component: () => import('../views/Store.vue'),
    children : [
      {
        path: '',
        component: () => import('../components/AllItem.vue'),
      },
      {
        path:':itemId',
        component: ()=> import('../components/ItemDetail.vue'),
      }
    ]
  },
  {
    path: '/mycart',
    name: 'MyCart',
    component: () => import('../views/MyCart.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
