<template>
  <b-card title="TOTAL" style="margin: 1rem 0;">
    <b-card-text style="margin-bottom: 0px">Quantity: {{ reduceQty }}</b-card-text>
    <b-card-text>Rp {{ reducePrice.toLocaleString() }}</b-card-text>
  </b-card>
</template>

<script>
export default {
  props: {
    cartList: Array
  },
  // methods: {
  //   reduceQty () {
  //     return cartList.reduce((acc, curr) => acc + curr.quantity )
  //   }
  // },
  computed: {
    reduceQty () {
      return this.cartList.reduce(((acc, curr) => acc + curr.quantity ), 0)
    },
    reducePrice () {
      return this.cartList.reduce(((acc, curr) => acc + (curr.ProductId.price * curr.quantity) ), 0)
    }
  }
}
</script>

<style>
</style>