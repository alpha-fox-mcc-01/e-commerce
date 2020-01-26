<template>
  <div id="app">
    <!-- <Navbar :access_token="access_token" @set-token="setAccessToken" /> -->
    <Navbar :access_token="access_token" @error-message="errorHandler" />
    <Error v-if="error" :error="error" />
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>-->
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
import Navbar from '@/components/Navbar.vue'
import Error from '@/components/Error.vue'
export default {
  data () {
    return {
      error: ''
    }
  },
  components: {
    Navbar,
    Error
  },
  computed: {
    access_token () {
      return this.$store.state.access_token
    }
  },
  methods: {
    errorHandler(err) {
      this.error = err;
      setTimeout(() => {
        this.error = "";
      }, 2500);
    }
  }
}
</script>
