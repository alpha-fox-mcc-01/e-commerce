<template>
  <div id="app">
    <div class="container" id="home">
      <div class="card center" id='landing-card' style="width: 90rem; height: 80vh;">
        <Navbar />
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  name: 'app',
  components: {
    Navbar
  },
  created () {
    this.$store.dispatch('getProducts')
    this.$store.dispatch('getCategories')
  }
}
</script>

<style>
@import 'https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: black;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: black;
}

#nav a.router-link-exact-active {
  color: black;
}

#landing-card{
    margin-left: 20vh;
    position: absolute;
    top: 50%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
}
#home {
  min-width: 100%;
  min-height: 100vh;
  /* background-color:rgba(0, 255, 255, 0.287); */
}
</style>
