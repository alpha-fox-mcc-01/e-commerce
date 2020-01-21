<template>
  <div class="card" style="width: 17rem;">
    <img class="card-img-top" :src="`${product.featured_image}`" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">{{ product.name }}</h5>
      <p class="card-text">{{ product.description.slice(0, 100)}}<span v-if='product.description.length > 100'>...</span></p>
      <button class="btn btn-primary" @click="getOneItem">View More</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'productCard',
  props: ['product'],
  methods: {
    getOneItem () {
      this.$router.push(`/products/${this.product._id}`)
    }
  }
}
</script>

<style scoped>
.card {
  margin: 0.5rem 0.5rem 0.5rem 0.5rem;
}
</style>
