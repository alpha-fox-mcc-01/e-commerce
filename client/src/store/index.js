import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    access_token: localStorage.getItem('access_token'),
    products: [],
    userId: ''
  },
  mutations: {
    stateToken(state, token) {
      localStorage.setItem('access_token', token)
      state.access_token = token
    },
    removeToken(state) {
      state.access_token = ''
      localStorage.removeItem('access_token')
    },
    setProduct(state, products) {
      state.products = products
    },
    setUserId(state, user_id) {
      state.userId = user_id
    }
  },
  actions: {
    fetchProducts() {
      axios({
        method: 'get',
        url: 'http://localhost:3000/api/product',
      })
        .then(products => {
          this.commit('setProduct', products.data)
        })
        .catch(err => console.log(err))
    },
    fetchOneProduct({ commit }, id) {
      return axios({
        method: 'GET',
        url: 'http://localhost:3000/api/product/' + id
      })
    },
    login({ commit }, user) {
      return axios({
        method: 'post',
        url: 'http://localhost:3000/login',
        data: {
          email: user.email,
          password: user.password
        }
      })
    },
    addToCart({ commit }, data) {
      return axios({
        method: 'post',
        url: 'http://localhost:3000/cart',
        data: {
          UserId: this.userId,
          ProductId: data.id,
          quantity: data.qty
        },
        headers: {
          'access_token': localStorage.getItem('access_token')
        }
      })
    }
    // fetchTodos() {
    //   db.collection('todos')
    //     .onSnapshot((doc) => {
    //       const todos = []
    //       doc.docs.forEach((document) => {
    //         const data = document.data()
    //         data.id = document.id
    //         todos.push(data)
    //       })
    //       this.commit('storeTodo', todos)
    //     })
    // },
    // deleteCard({ commit }, id) {
    //   return db.collection('todos').doc(id).delete()
    // },
    // prevCat({ commit }, data) {
    //   const cats = this.state.category
    //   console.log(data.id)
    //   let index = cats.indexOf(data.cat)
    //   index -= 1
    //   const category = cats[index]
    //   return db.collection('todos').doc(data.id).update({
    //     category
    //   })
    // },
    // nextCat({ commit }, data) {
    //   const cats = this.state.category
    //   console.log(data.id)
    //   let index = cats.indexOf(data.cat)
    //   index += 1
    //   const category = cats[index]
    //   return db.collection('todos').doc(data.id).update({
    //     category
    //   })
    // },
    // addCard({ commit }, data) {
    //   return db.collection('todos').add({
    //     title: data.title,
    //     description: data.description,
    //     assigned: data.assigned,
    //     priority: data.priority,
    //     category: 'backlog'
    //   })
    // }
  }
})
