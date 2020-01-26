<template>
  <div class='col-md-10'>
    <div class='row'>
    </div>
    <div class='row' id='products-row'>
      <ProductCard v-for='product in products' :product='product' :key='product._id' />
    </div>
  </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue'
export default {
  name: 'Products',
  components: {
    ProductCard
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  }
}
</script>

<style scoped>

#products-row {
  height: 35rem;
  overflow-y: auto;
}
</style>
