<template>
  <div class="card" style="width: 17rem;">
    <img class="card-img-top" :src="`${product.featured_image}`" height=350 width=200 alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">{{ product.name.slice(0, 50)}}<span v-if='product.name.length > 50'>...</span></h5>
      <br v-if='product.name.length < 26' />
      <h6 class="card-subtitle mb-2 text-muted">Rp. {{ product.price.toLocaleString() }}</h6>
      <p class="card-text">{{ product.description.slice(0, 100)}}<span v-if='product.description.length > 100'>...</span></p>
      <div id='row'>
        <button class="btn btn-light" @click="getOneItem">View More</button>
        <p v-if='product.stocks > 0' class='stock-status'>In Stock.&nbsp;</p>
        <p v-else class='stock-status' id='stock-empty'>&nbsp;Out of Stock.</p>
      </div>
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
.btn.btn-primary {
  display: inline-block;
}
.stock-status {
  display: inline-block;
  margin-left: 1rem;
  color: rgb(50,205,50);
}
#stock-empty {
  color: lightcoral;
}
.card {
  font-family: 'Nunito', sans-serif;
  margin: 0.5rem 0.5rem 0.5rem 0.5rem;
}
.btn.btn-light {
  color: indigo;
  border-color: indigo;
}
</style>
