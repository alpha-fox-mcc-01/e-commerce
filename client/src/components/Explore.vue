<template>
  <div class='col-md-2'>
    <router-link to="/enter"><p>New In</p></router-link><br>
    <router-link to="/enter"><p>Clothing</p></router-link><br>
    <router-link to="/enter"><p>Shoes</p></router-link><br>
    <router-link to="/enter"><p>Accessories</p></router-link><br>
    <router-link to="/enter"><p>Activewear</p></router-link><br>
  </div>
</template>

<script>
export default {
  name: 'explore'
}
</script>

<style scoped>
p {
  color: black;
}
</style>
