<template>
  <div id="nav">
    <nav class="navbar navbar-light bg-light justify-content-start">
      <div class="container">
        <a class="navbar-brand" href="#">VAN</a>
        <router-link class="nav-link" to="/">Home</router-link>
        <router-link class="nav-link" to="/product">Products</router-link>
        <router-link
          class="nav-link"
          to="/cart"
          v-if="isLogin"
        >Cart</router-link>
        <router-link
          class="nav-link ml-auto"
          to="/login"
          v-if="!isLogin"
        >Sign In</router-link>
        <span
          class="nav-link ml-auto"
          v-if="isLogin"
        >Hello, {{ userName }}
        </span>
        <span
          class="nav-link pointer span-hover"
          v-if="isLogin"
          @click="logOut"
        >Sign Out</span>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    },
    userName() {
      return localStorage.getItem('userName');
    },
  },
  methods: {
    logOut() {
      localStorage.clear();
      this.$store.commit('changeIsLogin', false);
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
  .pointer{
    cursor: pointer;
  }

  .span-hover:hover {
    color: rgb(85, 85, 85) !important;
  }

</style>
