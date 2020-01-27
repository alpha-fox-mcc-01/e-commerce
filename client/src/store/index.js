import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    categories: [],
    cart: []
  },
  mutations: {
    fillProducts (state, payload) {
      state.products = payload
    },
    setCategories (state, payload) {
      state.categories = payload
    },
    setCart (state, payload) {
      state.cart = payload
    }
  },
  actions: {
    getProducts (context, payload) {
      if (!payload) {
        axios({
          method: 'GET',
          url: 'http://35.187.233.73/products'
        })
          .then(({ data }) => {
            context.commit('fillProducts', data)
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        axios({
          method: 'GET',
          url: 'http://35.187.233.73/products/categories/' + payload
        })
          .then(({ data }) => {
            context.commit('fillProducts', data)
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    searchProducts (context, payload) {
      axios({
        method: 'GET',
        url: 'http://35.187.233.73/products/?keyword=' + payload
      })
        .then(({ data }) => {
          context.commit('fillProducts', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getCategories (context) {
      axios({
        method: 'GET',
        url: 'http://35.187.233.73/products/categories'
      })
        .then(({ data }) => {
          context.commit('setCategories', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getCart (context) {
      axios({
        method: 'GET',
        url: 'http://35.187.233.73/users/cart',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          context.commit('setCart', data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})
