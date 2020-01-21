<template>
  <div>
    <div class="card-body">
      <div class='row' style='margin-top: 2rem;'>
        <Explore />
        <Products :products="products"/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Explore from '@/components/Explore.vue'
import Products from '@/components/Products.vue'
export default {
  name: 'home',
  components: {
    // HelloWorld
    Explore,
    Products
  },
  props: ['products'],
  methods: {
    getProducts () {
      this.$emit('getProducts')
    }
  },
  created () {
    this.getProducts()
  }
}
</script>

<style scoped>

</style>
