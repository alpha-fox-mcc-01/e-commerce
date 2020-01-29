<template>
  <div class="home">
    <Slider :products="products"/>
    <div class="row justify-content-center">
      <ProductCard
        v-for="product in products"
        :key="product._id"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Slider from '../components/Carousel'
import ProductCard from '../components/ProductCard'
export default {
  name: 'home',
  props: {
    products: Array
  },
  components: {
    Slider,
    ProductCard
  }
}
</script>
