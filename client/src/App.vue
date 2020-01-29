<template>
  <div id="app">
    <Navbar />
    <div class="mt-5 pt-3 container">
      <router-view
      :products="products"
      />
    </div>
    <Footer/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import axios from 'axios'
export default {
  name: 'App',
  data () {
    return {
      products: []
    }
  },
  components: {
    Navbar,
    Footer
  },
  methods: {
    getProducts () {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/products'
      })
        .then(({ data }) => {
          console.log(data)
          this.products = data
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.getProducts()
  }
}
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.mt-5 {
  min-height: 100vh;
}
</style>
