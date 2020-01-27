<template>
  <div class="container">
    <n-navbar />
    <carousel />
    <product class="mt-3"/>
    <n-footer />
  </div>
</template>

<script>
import carousel from '../components/carousel'
import product from '../components/product'
import navbar from '../components/navbar'
import nFooter from '../components/nFooter'
export default {
  name: 'Main-Page',
  components: {
    carousel,
    product,
    'n-navbar': navbar,
    'n-footer': nFooter
  },
  created () {
    this.$store.dispatch('fetchProduct')
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  }
}
</script>

<style>

</style>
