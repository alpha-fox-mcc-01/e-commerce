<template>
  <div class="container">
    SIDEBAR
    <div class="row">
      <ProductCard
        v-for="product in products"
        :key="product._id"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard'
export default {
  name: 'Sidebar',
  props: {
    products: Array
  },
  components: {
    ProductCard
  }
}
</script>

<style scoped>
.container {
  min-height: 100vh;
}
</style>
