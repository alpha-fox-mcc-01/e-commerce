<template>
  <div id="app">
    <!-- <navbarHome />
    <Home />
    <footerHome />-->
    <router-view />
  </div>
</template>
<script>
// @ is an alias to /src
// import navbarHome from "@/components/navbarHome.vue";
// import footerHome from "@/components/footerHome";
// import Home from "./views/Home";
export default {
  components: {
    // navbarHome,
    // footerHome,
    // Home,
  }
}
</script>
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
