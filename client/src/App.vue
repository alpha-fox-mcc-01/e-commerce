<template>
  <div id="app">
    <PinkHeader></PinkHeader>
    <NavBar></NavBar>
    <router-view :products="products" />
    <FootBar />
  </div>
</template>

<script>
import NavBar from './components/Navbar'
import PinkHeader from './components/PinkHeader'
import FootBar from './components/FootBar'
import ItemsDisplay from './components/ItemsDisplay'
import axios from 'axios'
export default {
  name : 'App',
  components: {
    NavBar,
    PinkHeader,
    FootBar,
    ItemsDisplay
  },
  data () {
    return {
      products: []
    }
  },
  methods: {
    getProducts () {
      axios.get('http://localhost:3000/products')
            .then(({data}) => {
              console.log(data)
              this.products = data.result
            })
            .catch(err => {
              console.log(err)
            })
    }
  },
  created: function () {
    this.getProducts()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
