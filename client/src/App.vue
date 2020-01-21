<template>
  <div id="app">
    <div id="nav">
      <nav class="navbar navbar-light bg-light justify-content-start">
        <div class="container">
          <a class="navbar-brand" href="#">VAN</a>
          <router-link class="nav-link" to="/">Home</router-link>
          <router-link class="nav-link ml-auto" to="/login">Sign In</router-link>
        </div>
      </nav>
    </div>
    <router-view
      :products="products"
      :productsStarter="productsStarter"
      @fetchProducts="fetchProducts"
    />
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      products: [],
      productsStarter: [],
      product: {},
    };
  },
  methods: {
    fetchProducts() {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/product',
      })
        .then(({ data }) => {
          this.products = data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    homeProducts() {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/product/starter',
      })
        .then(({ data }) => {
          this.productsStarter = data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.homeProducts();
    this.fetchProducts();
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* #nav {
  padding: 30px;
} */

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
