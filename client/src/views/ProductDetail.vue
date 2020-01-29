<template>
  <div class="container">
    <h2>Product Details</h2>
    <div class="row justify-content-center">
      <img :src="product.imageUrl" alt="product image" class="w-50 text-center">
    </div>
    <div class="row text-left mx-2 my-5">
      <p>Name: {{product.name}} </p>
      <p>Description: {{product.description}} </p>
      <p>Price: Rp.{{product.price}},- </p>
    </div>
    <div class="row">
      <form @submit.prevent="addToCart">
        <div class="form-group">
          <label for="quantity">Quantity</label>
          <input type="number" class="form-control" id="quantity"
            min="1"
            :max="product.stock"
            v-model="quantity"
          >
          <input class="btn btn-dark mt-3" type="submit" value="Add to Cart">
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ProductDetail',
  data () {
    return {
      product: {},
      quantity: 0
    }
  },
  methods: {
    getProduct () {
      axios({
        method: 'GET',
        url: `http://localhost:3000/products/${this.$route.params.id}`
      })
        .then(({ data }) => {
          this.product = data
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    // console.log(this.$route.params)
    this.getProduct()
  },
  watch: {
    '$route.params.id': function () {
      this.getProduct()
    }
  }
}
</script>

<style>
</style>
