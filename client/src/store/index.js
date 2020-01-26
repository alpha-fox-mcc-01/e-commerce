import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router/index.js'
Vue.use(Vuex)
import Swal from 'sweetalert2'

export default new Vuex.Store({
  state: {
    products: [],
    product: {}
  },
  mutations: {
    insertAllProducts (state, payload) {
      state.products = payload
    },
    insertProductDetail (state, payload) {
      state.product = payload
    }
  },
  actions: {
    getProducts (context) {
      axios.get('http://localhost:3000/products')
        .then(({ data }) => {
          console.log(data)
          context.commit('insertAllProducts', data.result)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getDetail (context, payload) {
      axios.get(`http://localhost:3000/products/${payload}`)
        .then(({ data }) => {
          context.commit('insertProductDetail', data.result)
        })
        .catch(err => {
          console.log(err)
        })
    },
    searchItem (context, payload) {
      axios.get(`http://localhost:3000/products/search/${payload}`)
      .then(({ data }) => {
        context.commit('insertProductDetail', data.result)
      })
      .catch(err => {
        console.log(err)
      })
    },
    userLogin(context, payload) {
      axios.post('http://localhost:3000/users/login', {
        email: payload.email,
        password: payload.password
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          Swal.fire('Logged In', 'You have successfully logged in', 'success')
          router.push('/')
        })
        .catch(err => {
          Swal.fire('Login failed', `Username/password wrong: ${err}`, 'error')
        })
    }
  },
  modules: {

  }
})
