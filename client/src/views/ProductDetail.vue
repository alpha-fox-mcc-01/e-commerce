<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-lg-6 border">
        <img :src="product.image" alt="Product image">
      </div>
      <div class="col-lg-6 justify-content-center flex-row">
        <div class="container-fluid">
          <div class="row justify-content-end">
            <div class="col-4">
              <h3>Nama</h3>
            </div>
            <div class="col-8">
              <h3>{{ product.name }}</h3>
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              <h3>Harga</h3>
            </div>
            <div class="col-8">
              <p>{{ product.price }}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-4">
              <h3>Stock</h3>
            </div>
            <div class="col-8">
              <p>{{ product.stock }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProductDetail',
  data() {
    return {
      product: {},
    };
  },
  methods: {
    showProduct() {
      axios({
        method: 'GET',
        url: `http://localhost:3000/product/${this.$route.params.id}`,
      })
        .then(({ data }) => {
          this.product = data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.showProduct();
  },
};
</script>

<style scoped>
  img {
    max-width: 100%;
  }
</style>
