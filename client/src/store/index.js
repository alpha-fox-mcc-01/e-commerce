import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    idUser: ''
  },
  mutations: {
    fetchProduct (state, data) {
      state.products = data
    },
    addIdUser (state, data) {
      console.log('berhasil commit idUser');
      state.idUser = data
    }
  },
  actions: {
    fetchProduct (context) {
      axios({
        method: 'get',
        url: 'http://localhost:3000/product'
      })
        .then(({ data }) => {
          console.log(data)
          context.commit('fetchProduct', data)
        })
        .catch(err => {
          console.log(err.response.data)
        })
    }
  },
  modules: {
  }
})
