import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items : [],
    cart : []
  },
  mutations: {
    setItems (state, items) {
      state.items = items
    },
    setCart (state, items) {
      state.cart = items
    }
  },
  actions: {
    getAllItem ({commit}) {
      axios({
        method : `GET`,
        url : `http://localhost:3000/items`
      })
        .then(({data}) => {
          console.log(data, `ini dataaaaaaaaaa`);
          commit('setItems', data)
        })
        .catch (err => {
          console.log(err.message);        
        })
    },
    getCart ({commit}) {
      axios({
        method : `GET`,
        url : `http://localhost:3000/users/getcart`,
        headers : {
          token : localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          // console.log(data.cart);
          // console.log(`getCart jalan`);
          commit('setCart', data.cart)
        })
        .catch (err => {
          console.log(err);       
        })
    }
  },
  modules: {
  }
})
