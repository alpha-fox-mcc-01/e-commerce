import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items : [],
    cart : [],
    isLogin : ''
  },
  mutations: {
    setItems (state, items) {
      state.items = items
    },
    setCart (state, items) {
      state.cart = items
    },
    setIsLogin (state, item) {
      state.isLogin = item
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
          commit('setCart', data.cart)
        })
        .catch (err => {
          console.log(err);       
        })
    },
    isLoginAction (context, payload) {
      context.commit('setIsLogin', payload)
    }
  },
  modules: {
  }
})
