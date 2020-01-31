<template>
  <div id="navbar-custom">
    <header>
      <div class="container">
        <h1
          class="text-center mb-3 mt-3"
          style="font-family: 'Patrick Hand SC', cursive; color: rgb(66, 66, 66);">
          <strong>Chibi Store</strong>
          <i class="fas fa-candy-cane ml-2"></i>
        </h1>
        <nav class="navbar navbar-expand-md p-0">
          <div class="collapse navbar-collapse d-md-flex justify-content-center" id="trigger">
            <ul class="navbar-nav">
              <li class="navbar-item mx-1">
                <router-link to="/" class="nav-link">Home</router-link>
                <!-- <router-link to="/">Home</router-link> -->
              </li>
              <li class="navbar-item mx-1">
                <router-link to="/store" class="nav-link">Store</router-link>
              </li>
              <li class="navbar-item mx-1">
                <router-link to="/mycart" class="nav-link">
                  My Cart
                  <i class="fas fa-cart-arrow-down ml-1"></i>
                </router-link>
              </li>
              <li class="navbar-item mx-1">
                <router-link to="/about" class="nav-link">About</router-link>
                <!-- <router-link to="/about">About</router-link> -->
              </li>
              <li class="navbar-item mx-1" v-if="!isLogin">
                <router-link to="/login" class="nav-link">login</router-link>
              </li>
              <li class="navbar-item mx-1" style="cursor: pointer" v-if="isLogin">
                <p class="nav-link" style @click="logout">logout</p>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
    <hr />
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: `Navbar`,
  data () {
    return {

    }
  },
  methods: {
    logout() {
      if (localStorage.getItem("token")) {
        // console.log('logout udah');
        Swal.fire("Logged out successfully!", "", "success");
        this.$store.dispatch('isLoginAction', false)
        localStorage.removeItem("token");
      } else {
        console.log(`login dulu bos`);
        Swal.fire("Are you login yet?", "login dulu dong bosq", "question");
      }
    }
  },
  computed : {
    isLogin () {
      return this.$store.state.isLogin
    }
  }
};
</script>

<style>
</style>
