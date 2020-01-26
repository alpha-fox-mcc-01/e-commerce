<template>
  <div id="navbar-custom">
     <header>
      <div class="container">
        <h1 class="text-center mb-4 mt-3" style="font-family: 'Patrick Hand SC', cursive; color: rgb(66, 66, 66);">
          <strong>Chibi Store</strong> <i class="fas fa-candy-cane"></i>
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
                <router-link to="/mycart" class="nav-link">My Cart<i class="fas fa-cart-arrow-down ml-1"></i></router-link>
              </li>
              <li class="navbar-item mx-1">
                <router-link to="/about" class="nav-link">About</router-link>
                <!-- <router-link to="/about">About</router-link> -->
              </li>
              <li class="navbar-item mx-1">
                <router-link to="/login" class="nav-link">login</router-link>
              </li>
              <li class="navbar-item mx-1" style="cursor: pointer">
                <p class="nav-link" style="" @click="logout">logout</p>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
    <hr>
  </div>
</template>

<script>
export default {
  name: `Navbar`,
  methods : {
    logout () {
      if (localStorage.getItem('token')) {
        console.log('logout udah');      
        localStorage.removeItem('token')
      }
      else {
        console.log(`login dulu bos`);
      }
    }
  }
}
</script>

<style>

</style>