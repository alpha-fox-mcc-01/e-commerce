<template>
    <div class="flex mb-4">
      <ItemSingle v-for="product in products" :product="product" :key="product._id" />
    </div>
</template>

<script>
import ItemSingle from './ItemSingle'
export default {
  name: 'ItemsDisplay',
  props: {
    products: Array
  },
  components: {
    ItemSingle
  }
}
</script>

<style scoped>
.flex {
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  height: 60rem;
  overflow-y: auto;
}
</style>
