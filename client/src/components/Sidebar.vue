<template>
  <div class="container">
    SIDEBAR
    <div>
      <ProductCard />
    </div>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard'
export default {
  name: 'Sidebar',
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
