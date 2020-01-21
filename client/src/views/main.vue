<template>
  <div class="container">
    <n-navbar />
    <carousel />
    <product class="mt-3"/>
  </div>
</template>

<script>
import carousel from '../components/carousel'
import product from '../components/product'
import navbar from '../components/navbar'
export default {
  name: 'Main-Page',
  components: {
    carousel,
    product,
    'n-navbar': navbar
  }
}
</script>

<style>

</style>
