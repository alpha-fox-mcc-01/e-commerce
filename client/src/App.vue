<template>
  <div id="app">
    <PinkHeader></PinkHeader>
    <NavBar></NavBar>
    <router-view/>
    <FootBar />
  </div>
</template>

<script>
import NavBar from './components/Navbar'
import PinkHeader from './components/PinkHeader'
import FootBar from './components/FootBar'
export default {
  name: 'App',
  data () {
    return {
      loggedIn: false
    }
  },
  components: {
    NavBar,
    PinkHeader,
    FootBar
  },
  created: function () {
    this.$store.dispatch('getProducts')
    this.$store.dispatch('fetchCart')
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
