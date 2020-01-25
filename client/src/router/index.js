import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'landingpage',
    component: () => import(/* webpackChunkName: "landingpage" */ '../views/LandingPage.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginPage.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/RegisterPage.vue')
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () => import(/* webpackChunkName: "checkout" */ '../views/CheckoutPage.vue')
  },
  {
    path: '/products/:id',
    name: 'details',
    component: () => import(/* webpackChunkName: "checkout" */ '../views/ProductDetail.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import(/* webpackChunkName: "cart" */ '../views/CartPage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
