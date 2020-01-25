import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

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
    }
  },
  modules: {

  }
})
