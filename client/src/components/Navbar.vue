<template>
  <div id="nav" class='row'>
    <div class='col-md-2'>
      <router-link to="/"><h3>MeCommerce</h3></router-link>
      <!-- <router-link to="/about">About</router-link> |
      <router-link to="/register">Sign Up</router-link> -->
    </div>
    <div class='col-md-6'>
      <form @submit.prevent="$emit('searchProducts', keyword)">
        <div class="input-group mb-3">
          <input type="text" v-model='keyword' class="form-control" placeholder="Find an item..." aria-label="Recipient's username" aria-describedby="basic-addon2">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="submit">Search</button>
          </div>
        </div>
      </form>
    </div>
    <div class='col-md-2'>
      <router-link to="/cart"><h6><img src='@/assets/cart.png' width="20" height="20">&nbsp;&nbsp;&nbsp;&nbsp;Cart</h6></router-link>
    </div>
    <div class='col-md-2'>
      <router-link to="/login"><h6><img src='@/assets/loginuser.png' width="20" height="20">&nbsp;&nbsp;&nbsp;&nbsp;Sign In/Sign Up</h6></router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  data () {
    return {
      keyword: ''
    }
  }
}
</script>

<style scoped>
.col-md-2 h6 {
  margin-top: 0.5rem;
}
#search-bar {
  width: 80%
}
</style>
