<template>
  <div>
    <b-button variant='transparent' id="popover-target-1">
      {{ cart.length }}&nbsp;<img src='@/assets/cart.png' width="20" height="20">&nbsp;Cart
    </b-button>
    <b-popover target="popover-target-1" triggers="hover" placement="bottom">
      <p v-if='cart.length === 0'>Your Cart is Empty</p>
      <div class='card' v-for='product in cart' :key='product._id'>
        <div class='card-title'>{{ product.product.name }}</div>
        <div class='card-body'> {{ product.product.description }}</div>
      </div>
      <b-button v-if='cart.length > 0' variant='dark' @click='getToCart'>View my Cart</b-button>
    </b-popover>
  </div>
</template>

<script>
export default {
  name: 'miniCart',
  methods: {
    getToCart () {
      this.$router.push(`/users/${cart.username}`)
    }
  },
  computed: {
    cart () {
      return this.$store.state.cart
    }
  }
}
</script>

<style>
</style>
