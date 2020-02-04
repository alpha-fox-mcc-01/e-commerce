import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    access_token: localStorage.getItem('access_token'),
    products: [],
    userId: localStorage.getItem('activeUserId'),
    userRole: localStorage.getItem('userRole')
  },
  mutations: {
    stateToken(state, token) {
      localStorage.setItem('access_token', token)
      state.access_token = token
    },
    removeToken(state) {
      state.access_token = ''
      localStorage.removeItem('access_token')
      localStorage.removeItem('activeUserId')
      localStorage.removeItem('userRole')
    },
    setProduct(state, products) {
      state.products = products
    },
    setUserId(state, user_id) {
      localStorage.setItem('activeUserId', user_id)
      state.userId = user_id
    },
    setRole(state, role) {
      localStorage.setItem('userRole', role)
      state.userRole = role
    }
  },
  actions: {
    fetchProducts() {
      axios({
        method: 'get',
        url: 'http://54.85.108.180:3000/api/product',
      })
        .then(products => {
          this.commit('setProduct', products.data)
        })
        .catch(err => console.log(err))
    },
    fetchOneProduct({ commit }, id) {
      return axios({
        method: 'get',
        url: 'http://54.85.108.180:3000/api/product/' + id
      })
    },
    updateOneProductStock({ commit }, data) {
      return axios({
        method: 'patch',
        url: 'http://54.85.108.180:3000/api/product/' + data.id,
        data: {
          stock: data.stock
        },
        headers: {
          "access_token": localStorage.getItem('access_token')
        }
      })
    },
    login({ commit }, user) {
      return axios({
        method: 'post',
        url: 'http://54.85.108.180:3000/login',
        data: {
          email: user.email,
          password: user.password
        }
      })
    },
    addToCart({ commit }, data) {
      return axios({
        method: 'post',
        url: 'http://54.85.108.180:3000/cart',
        data: {
          UserId: this.state.userId,
          ProductId: data.id,
          quantity: data.qty
        },
        headers: {
          'access_token': localStorage.getItem('access_token')
        }
      })
    },
    fetchCart() {
      return axios({
        method: 'get',
        url: 'http://54.85.108.180:3000/cart/' + this.state.userId,
        headers: {
          'access_token': this.state.access_token
        }
      })
    },
    deleteFromCart({ commit }, id) {
      return axios({
        method: 'delete',
        url: 'http://54.85.108.180:3000/cart/' + id,
        headers: {
          'access_token': this.state.access_token
        }
      })
    },
    register({ commit }, user) {
      return axios({
        method: 'post',
        url: 'http://54.85.108.180:3000/register',
        data: {
          username: user.username,
          email: user.email,
          password: user.password
        }
      })
    },
    deleteProduct(context, id) {
      return axios({
        method: 'delete',
        url: 'http://54.85.108.180:3000/api/product/' + id,
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
    },
    editProduct(context, data) {
      return axios({
        method: 'put',
        url: 'http://54.85.108.180:3000/api/product/' + data.id,
        data: {
          name: data.name,
          description: data.description,
          category: data.category,
          price: data.price,
          stock: data.stock,
          imageUrl: data.imageUrl
        },
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
    },
    editQuantity(context, data) {
      return axios({
        method: "patch",
        url: 'http://54.85.108.180:3000/cart/' + data.id,
        data: {
          quantity: data.quantity
        },
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
    }
  }
})
