<template>
  <div class="container-fluid mb-2 p-0">
    <div class="jumbotron jumbotron-fluid">
    </div>
    <h1 class="display-4">New Year 2020 SALE</h1>
    <div class="container">
      <div class="row justify-content-center mb-5">
        <ProductCard
          v-for="product in productsStarter" :key="product._id"
          :product="product"/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ProductCard from '../components/ProductCard.vue';

export default {
  name: 'home',
  data() {
    return {
      page: 1,
    };
  },
  props: {
    productsStarter: Array,
  },
  components: {
    ProductCard,
  },
};
</script>

<style scoped>
  .jumbotron{
    background-image: url('../assets/newyear.jpg');
    background-position: center;
    background-size: 100%;
    min-height: 20rem;
  }

  .display-4 {
    color: #42b983;
  }
</style>
