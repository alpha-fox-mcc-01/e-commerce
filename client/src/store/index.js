import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import axios from '../api/axiosInstance'
export default new Vuex.Store({
  state: {
    cartData: [],
    userData: {},
    isLogin: true
  },
  mutations: {
    setUserData(state, payload){
      console.log(payload, 'ini dari action')
      state.userData = payload
      state.cartData = payload.cart
      console.log(state.userData)
    },
    checkLogin(state){
        state.isLogin = false
        console.log('sampe mutation');
        
    }

  },
  actions: {
    getUser(context){
      axios({
        method: "get",
        url: "/user/cart",
        headers: {
          access_token : localStorage.getItem('access_token')
        }
      })
      .then(({data}) =>{
        // console.log(data, 'dari data');
        context.commit('setUserData', data.data)
      })
      .catch( err =>{
        console.log(err);
        
      })
    }
  },
  getters: {

  }
})