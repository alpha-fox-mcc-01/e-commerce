import Vue from 'vue';
import Vuex from 'vuex';
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
  },
  actions: {
    register(_, payload) {
      const { name, email, password } = payload;
      return axios({
        method: 'POST',
        url: 'http://localhost:3000/user/register',
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
        url: 'http://localhost:3000/user/login',
        data: {
          email,
          password,
        },
      });
    },
  },
  getters: {

  },
});
