<template>
  <div class='col-md-2'>
    <router-link to="/"><p>New In</p></router-link>
    <p class='product-category' v-for='(category, i) in categories' :key='i' @click="productByCategory(category)">{{ category }}</p>
    <!-- <router-link to="/enter"><p>New In</p></router-link><br> -->
    <!-- <router-link to="/enter"><p>New In</p></router-link><br>
    <router-link to="/enter"><p>Clothing</p></router-link><br>
    <router-link to="/enter"><p>Shoes</p></router-link><br>
    <router-link to="/enter"><p>Accessories</p></router-link><br>
    <router-link to="/enter"><p>Activewear</p></router-link><br> -->
  </div>
</template>

<script>
export default {
  name: 'explore',
  computed: {
    categories () {
      return this.$store.state.categories
    }
  },
  methods: {
    productByCategory (category) {
      this.$store.dispatch('getProducts', category)
    }
  }
}
</script>

<style scoped>
p {
  color: black;
}
.product-category {
  opacity: 0.8;
}
.product-category:hover {
  opacity: 1.4;
  cursor: pointer;
}
</style>
