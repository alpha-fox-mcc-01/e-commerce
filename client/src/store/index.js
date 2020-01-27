import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router/index.js'
import Swal from 'sweetalert2'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    product: {},
    cart: [],
    isLoggedIn: ''
  },
  mutations: {
    insertAllProducts (state, payload) {
      state.products = payload
    },
    insertProductDetail (state, payload) {
      state.product = payload
    },
    insertCart (state, payload) {
      state.cart = payload
    },
    setStatus (state, payload) {
      state.isLoggedIn = payload
    }
  },
  actions: {
    getProducts (context) {
      axios.get('http://35.240.238.247/products')
        .then(({ data }) => {
          context.commit('insertAllProducts', data.result)
          if (localStorage.getItem('access_token')) {
            context.commit('setStatus', true)
          }
        })
        .catch(err => {
          Swal.fire('Oops', `An error occured : ${err}`, 'error')
        })
    },
    getDetail (context, payload) {
      axios.get(`http://35.240.238.247/products/${payload}`)
        .then(({ data }) => {
          context.commit('insertProductDetail', data.result)
          if (localStorage.getItem('access_token')) {
            context.commit('setStatus', true)
          }
        })
        .catch(err => {
          Swal.fire('Oops', `An error occured : ${err}`, 'error')
        })
    },
    searchItem (context, payload) {
      axios.get(`http://35.240.238.247/products/search/${payload}`)
        .then(({ data }) => {
          if (data.result.length > 0 || data.result) {
            router.push('/products/' + data.result[0]._id)
          } else {
            Swal.fire('Oops', `We can't find what you're looking for`, 'error')
          }
        })
        .catch(err => {
          Swal.fire('Oops', `Product not found, try another keyword: ${err}`, 'error')
        })
    },
    userLogin (context, payload) {
      axios.post('http://35.240.238.247/users/login', {
        email: payload.email,
        password: payload.password
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('username', data.username)
          context.commit('setStatus', true)
          Swal.fire('Logged In', 'You have successfully logged in', 'success')
          router.push('/products')
        })
        .catch(err => {
          Swal.fire('Login failed', `Username/password wrong: ${err}`, 'error')
        })
    },
    userRegister (context, payload) {
      axios.post('http://35.240.238.247/users/register', {
        username: payload.username,
        email: payload.email,
        password: payload.password
      })
        .then(({ data }) => {
          Swal.fire('Register successful', 'You are now registered, please login', 'success')
          router.push('/login')
        })
        .catch((err) => {
          Swal.fire('Failed to register', `${err}`, 'error')
        })
    },
    addToCart (context, payload) {
      axios.post('http://35.240.238.247/users/cart', {
        product: payload
      }, { headers: {
        access_token: localStorage.getItem('access_token')
      } })
        .then(({ data }) => {
          Swal.fire('Yay!', 'Item successfully added to your cart', 'success')
        })
        .catch(err => {
          Swal.fire('Oops..', `${err}`, 'error')
        })
    },
    logOut (context, payload) {
      axios.delete('http://35.240.238.247/users/logout', { headers: { access_token: localStorage.getItem('access_token') }
      })
        .then(({ data }) => {
          context.commit('setStatus', false)
          Swal.fire('Success', 'You are now logged out', 'success')
        })
        .catch(err => {
          Swal.fire('Oops..', `${err}`, 'error')
        })
    },
    fetchCart (context, payload) {
      axios.get('http://35.240.238.247/users/cart', { headers: { access_token: localStorage.getItem('access_token') }
      })
        .then(({ data }) => {
          context.commit('insertCart', data.cart)
          context.commit('setStatus', true)
        })
        .catch(err => {
          Swal.fire('Ooops', `An error occured ${err}`, 'error')
        })
    },
    reduceQty (context, payload) {
      axios.put('http://35.240.238.247/users/cart', {
        product: payload
      }, { headers: { access_token: localStorage.getItem('access_token') }
      })
        .then(_ => {
        })
        .catch(err => {
          Swal.fire('Ooops', `An error occured ${err}`, 'error')
        })
    },
    updateStock (context, payload) {
      axios.put('http://35.240.238.247/products/' + payload.productId, {
        stock: payload.newStock
      }, { headers: { access_token: localStorage.getItem('access_token') }
      })
        .then(({ data }) => {
          router.push('/checkout')
        })
        .catch(err => {
          Swal.fire('Oops..', `An error occured: ${err}`, 'error')
        })
    }
  },
  modules: {
  }
})
