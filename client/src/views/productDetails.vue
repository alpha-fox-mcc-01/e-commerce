<template>
  <div class="container">
    <n-navbar />
    <b-row>
      <b-col sm="4">
        <n-card v-for="product in products" :key="product._id" :product="product"/>
      </b-col>
      <b-col sm="8">
         <router-view />
      </b-col>
    </b-row>
    <n-footer />
  </div>
</template>

<script>
import navbar from '../components/navbar'
import footer from '../components/nFooter'
import nCard from '../components/nCard'
export default {
  name: 'detailsProduct',
  components: {
    'n-navbar': navbar,
    'n-footer': footer,
    'n-card': nCard
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  }
}
</script>

<style scoped>
  .container {
    height: 100vh;
  }
</style>>
