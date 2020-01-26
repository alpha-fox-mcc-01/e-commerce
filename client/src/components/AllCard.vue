<template>
  <div class="row justify-content-center mb-5">
    <h1 class="col-12 my-5">List of our best product!</h1>
    <ProductCard
      v-for="product in products" :key="product._id"
      :product="product"/>
  </div>
</template>

<script>
import axios from 'axios';
import ProductCard from './ProductCard.vue';

export default {
  name: 'AllCard',
  data() {
    return {
      products: [],
    };
  },
  components: {
    ProductCard,
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
  },
  created() {
    this.fetchProducts();
  },
};
</script>

<style>

</style>
