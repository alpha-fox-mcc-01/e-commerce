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
    cart: []
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
    }
  },
  actions: {
    getProducts (context) {
      axios.get('http://localhost:3000/products')
        .then(({ data }) => {
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
    userLogin (context, payload) {
      axios.post('http://localhost:3000/users/login', {
        email: payload.email,
        password: payload.password
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          localStorage.setItem('username', data.username)
          Swal.fire('Logged In', 'You have successfully logged in', 'success')
          router.push('/products')
        })
        .catch(err => {
          Swal.fire('Login failed', `Username/password wrong: ${err}`, 'error')
        })
    },
    userRegister (context, payload) {
      axios.post('http://localhost:3000/users/register', {
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
      axios.post('http://localhost:3000/users/cart', {
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
      console.log(localStorage.getItem('access_token'))
      axios.delete('http://localhost:3000/users/logout', { headers: { access_token: localStorage.getItem('access_token') }
      })
        .then(({ data }) => {
          console.log(data)
          Swal.fire('Success', 'You are now logged out', 'success')
        })
        .catch(err => {
          Swal.fire('Oops..', `${err}`, 'error')
        })
    },
    fetchCart (context, payload) {
      axios.get('http://localhost:3000/users/cart', { headers: { access_token: localStorage.getItem('access_token') }
      })
        .then(({ data }) => {
          console.log(data, 'ini data cart')
          context.commit('insertCart', data.cart)
        })
        .catch(err => {
          Swal.fire('Ooops', `An error occured ${err}`, 'error')
        })
    },
    reduceQty (context, payload) {
      console.log('masuk store')
      axios.put('http://localhost:3000/users/cart', {
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
      console.log(payload, 'masuk updatestock')
      axios.put('http://localhost:3000/products/' + payload.productId, {
        stock: payload.newStock
      }, { headers: { access_token: localStorage.getItem('access_token') }
      })
        .then(({ data }) => {
          console.log(data, 'result update')
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
