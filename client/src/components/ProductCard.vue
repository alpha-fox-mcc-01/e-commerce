<template>
  <div class="col-6 col-md-4 col-lg-3 p-3 pointer">
    <div @click="showDetail(product._id)" class="card shadow">
      <img class="card-img-top" :src="product.image" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">{{ product.name }}</h5>
        <h6 class="card-subtitle mb-2 text-muted">{{ product.price }}</h6>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: Object,
  },
  methods: {
    showDetail(id) {
      this.$router.push(`/product/${id}`);
    },
  },
};
</script>

<style scoped>
  .card{
    max-width: 100%;
  }

  .pointer{
    cursor: pointer;
  }
</style>
