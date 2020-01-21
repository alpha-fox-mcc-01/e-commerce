<template>
    <div style="box-shadow: 0 2px 2px -2px rgba(0,0,0,.2);">
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/register">Register</router-link> |
      <router-link to="/checkout">Checkout</router-link>
    </div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style scoped>
div {
  text-align: center;
  box-shadow: 0 10px 10px -2px rgba(0,0,0,.2);
  margin-bottom: 1em;
}
a {
  text-align: center;
  font-family: sans-serif;
  font-weight: 500;
}

li {
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
}
</style>
