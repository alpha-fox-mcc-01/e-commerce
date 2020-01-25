<template>
  <div class="flex mb-4">
    <ItemSingle v-for="product in products" :product="product" :key="product._id" />
  </div>
</template>

<script>
import ItemSingle from './ItemSingle'
export default {
  name: 'ItemsDisplay',
  components: {
    ItemSingle
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  }
}
</script>

<style scoped>
.flex {
  align-items: center;
  margin: auto;
  flex-direction: row;
  flex-wrap: wrap;
  height: 60rem;
  /* overflow-y: auto;
  overflow-x: auto; */
  max-width: 70rem;
}
</style>
