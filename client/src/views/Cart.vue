<template>
  <div class="container">
    <h1 class="mt-3">Here's your cart {{ userName }}</h1>
  </div>
</template>

<script>

export default {
  name: 'Cart',
  computed: {
    userName() {
      return localStorage.getItem('userName');
    },
    userCart() {
      return this.$store.state.userCart;
    },
  },
};
</script>

<style>

</style>
