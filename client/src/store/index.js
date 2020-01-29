import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: '',
    errors: [],
    notification: '',
    isLogin: false,
    userCart: [],
  },
  mutations: {
    changeError(state, err) {
      state.error = err;
    },
    changeErrors(state, err) {
      state.errors = err;
    },
    changeNotification(state, notif) {
      state.notification = notif;
    },
    changeIsLogin(state, status) {
      state.isLogin = status;
    },
    changeUserCart(state, cart) {
      state.userCart = cart;
    },
  },
  actions: {
    register(_, payload) {
      const { name, email, password } = payload;
      return axios({
        method: 'POST',
        url: 'http://e-commerce.ivantjendra.xyz/user/register',
        data: {
          name,
          email,
          password,
        },
      });
    },
    login(_, payload) {
      const { email, password } = payload;
      return axios({
        method: 'POST',
        url: 'http://e-commerce.ivantjendra.xyz/user/login',
        data: {
          email,
          password,
        },
      });
    },
    getUserCart(context) {
      axios({
        method: 'GET',
        url: 'http://e-commerce.ivantjendra.xyz/user',
        headers: {
          access_token: localStorage.getItem('access_token'),
        },
      })
        .then((user) => {
          context.commit('changeUserCart', user.data.cart);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  getters: {

  },
});
