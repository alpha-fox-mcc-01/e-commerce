<template>
  <div id="nav" class='row'>
    <div class='col-md-2'>
      <router-link to="/"><h3 style='color: indigo;'>Zoom Commerce</h3></router-link>
      <!-- <router-link to="/about">About</router-link> |
      <router-link to="/register">Sign Up</router-link> -->
    </div>
    <div class='col-md-6'>
      <form @submit.prevent="searchProducts">
        <div class="input-group mb-3">
          <input type="text" v-model='keyword' class="form-control" placeholder="Find an item..." aria-label="Recipient's username" aria-describedby="basic-addon2">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="submit" style='color: indigo;border-color: indigo;'>Search</button>
          </div>
        </div>
      </form>
    </div>
    <div class='col-md-2'>
      <!-- <router-link to="/cart"><h6><img src='@/assets/cart.png' width="20" height="20">&nbsp;&nbsp;&nbsp;&nbsp;Cart</h6></router-link> -->
      <MiniCart />
    </div>
    <div class='col-md-2'>
      <router-link to="/login"><h6><img src='@/assets/loginuser.png' width="20" height="20">&nbsp;&nbsp;&nbsp;&nbsp;Sign In/Sign Up</h6></router-link>
    </div>
  </div>
</template>

<script>
import MiniCart from '@/components/MiniCart.vue'
export default {
  name: 'navbar',
  data () {
    return {
      keyword: ''
    }
  },
  methods: {
    searchProducts () {
      this.$store.dispatch('searchProducts', this.keyword)
    }
  },
  components: {
    MiniCart
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
#nav {
  font-family: 'Quicksand', sans-serif;
}
</style>
