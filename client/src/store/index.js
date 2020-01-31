import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    idUser: '',
    currentUserData: '',
    oneProduct: {}
  },
  mutations: {
    fetchProduct (state, data) {
      state.products = data
    },
    addIdUser (state, data) {
      console.log('berhasil commit idUser')
      state.idUser = data
    },
    fetchOneProduct (state, data) {
      state.oneProduct = data
    },
    setCurrentUserData (state, data) {
      console.log('berhasil masuk currentUserData')
      state.currentUserData = data
    }
  },
  actions: {
    fetchProduct (context) {
      axios({
        method: 'get',
        url: 'http://api-e-commerce.nafies.tech/product'
      })
        .then(({ data }) => {
          console.log(data)
          context.commit('fetchProduct', data)
        })
        .catch(err => {
          console.log(err.response.data)
        })
    },
    fetchOneProduct (context, idProduct) {
      console.log(idProduct, 'ini fetch one product')
      axios({
        method: 'get',
        url: 'http://api-e-commerce.nafies.tech/product/' + idProduct
      })
        .then(({ data }) => {
          console.log(data)
          context.commit('fetchOneProduct', data)
        })
        .catch(err => {
          console.log(err.response.data)
        })
    }
  },
  modules: {
  }
})
