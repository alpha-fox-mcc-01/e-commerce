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
    path: '/admin',
    name: 'admin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AdminDashboard.vue')
  },
  {
    path: '/product',
    name: 'product',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Product.vue'),
    children: [
      {
        path: ':id',
        name: 'product detail',
        component: () => import(/* webpackChunkName: "test" */ '../components/ProductDetail.vue')
      }
    ]
  },
  {
    path: '/cart',
    name: 'cart',
    // route level code-splitting
    // this generates a separate chunk (test.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "test" */ '../views/Cart.vue'),
    beforeEnter: (to, from, next) => {
      const UserId = localStorage.getItem('activeUserId')
      if (!UserId) next('/')
      else next()
    }
  },
  {
    path: '/add',
    name: 'add product',
    component: () => import(/* webpackChunkName: "test" */ '../components/Add.vue')
  },
  {
    path: '/edit/:id',
    name: 'edit product',
    component: () => import(/* webpackChunkName: "test" */ '../components/Edit.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    // page scroll to top for all route navigations
    return { x: 0, y: 0 }
  }
})

export default router
