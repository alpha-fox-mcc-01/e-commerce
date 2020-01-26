<template>
  <div id="app">
    <Navbar />
    <router-view
      :products="products"
      :productsStarter="productsStarter"
    />
  </div>
</template>

<script>
import axios from 'axios';
import Navbar from './components/Navbar.vue';

export default {
  data() {
    return {
      products: [],
      productsStarter: [],
      product: {},
    };
  },
  components: {
    Navbar,
  },
  methods: {
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
