<template>
  <div class='col-md-10'>
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
#products-row::-webkit-scrollbar-track
{
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  border-radius: 10px;
  background-color: #F5F5F5;
}

#products-row::-webkit-scrollbar
{
  width: 5px;
  background-color: #F5F5F5;
}

#products-row::-webkit-scrollbar-thumb
{
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color: grey;
}
</style>
