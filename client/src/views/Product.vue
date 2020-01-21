<template>
  <div class="container">
    <div v-if="!detail" class="row justify-content-center">
      <h1 class="col-12 my-5">List of our best product!</h1>
      <ProductCard
        v-for="product in products" :key="product._id"
        :product="product"/>
    </div>
    <router-view />
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard.vue';

export default {
  name: 'Product',
  data() {
    return {
      detail: false,
    };
  },
  props: {
    product: Object,
    products: Array,
  },
  components: {
    ProductCard,
  },
  created() {
    if (this.$route.params.id) {
      this.detail = true;
    } else {
      this.$emit('fetchProducts');
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (!this.detail && from.name === 'product') {
      this.detail = true;
      next();
    } else {
      this.detail = false;
      next();
    }
    // console.log(to);
    // console.log(from);
    // console.log(next);
    // called when the route that renders this component is about to
    // be navigated away from.
    // has access to `this` component instance.
  },
};
</script>

<style>

</style>
