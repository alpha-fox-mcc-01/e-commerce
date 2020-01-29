<template>
  <div class="container">
    <h1 class="mt-5">Here's your cart {{ userName }}</h1>
    <table class="table mt-5">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Product</th>
          <th scope="col">Price</th>
          <th scope="col">Quantity</th>
          <th scope="col">Total</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>
      <tbody>
        <CartProduct
          v-for="cart in userCart" :key="cart._id"
          :product="cart"
        />
      </tbody>
    </table>
    <h3 class="mt-4 border-bottom">Cart Total</h3>
    <h4 class="mt-5">Total - Rp {{ totalPrice }}</h4>
  </div>
</template>

<script>
import CartProduct from '../components/CartProduct.vue';

export default {
  name: 'Cart',
  components: {
    CartProduct,
  },
  computed: {
    userName() {
      return localStorage.getItem('userName');
    },
    userCart() {
      return this.$store.state.userCart;
    },
    totalPrice() {
      let total = 0;
      this.userCart.forEach((product) => {
        total += (product.quantity * product.product.price);
      });
      return new Intl.NumberFormat(['ban', 'id']).format(total);
    },
  },
  created() {
    this.$store.dispatch('getUserCart');
  },
};
</script>

<style>

</style>
