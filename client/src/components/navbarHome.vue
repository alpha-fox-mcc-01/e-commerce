<template>
<div>
     <div class="header-top mt-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-12 text-center">
            <a href="#" class="site-logo">
              <img src="../assets/logo.png" alt="Image" class="img-fluid">
            </a>
          </div>
          <a href="#" class="mx-auto d-inline-block d-lg-none site-menu-toggle js-menu-toggle text-black"><span
                class="icon-menu h3"></span></a>
        </div>
      </div>
  <nav class="navbar navbar-expand-sm bg-light justify-content-center">
  <ul class="navbar-nav">
    <li class="nav-item mr-3">
      <router-link to="/">Home</router-link>
    </li>
    <li class="nav-item mr-3">
      <router-link to="about">About</router-link>
    </li>
    <li class="nav-item mr-3">
      <router-link to="product">Wines</router-link>
    </li>
    <li class="nav-item mr-3  ">
     <router-link to="cart">Cart</router-link>
    </li>
    <li class="nav-item" v-if="check"> 
     <router-link to="login" >logIn</router-link>
    </li>
  </ul>

</nav>
</div>
</div>
</template>

<script>

export default {
  name: 'navbarhome', 
  data () {
    return {
      page: true
    }
  },
  computed:{
    check(){
    // if (localStorage.getItem('access_token')) {
    //   return false
    // } else {
    //   return true
    // } 
    console.log(this.$store.state.isLogin, '{}{}{}{}{');
     return this.$store.state.isLogin
    }
  },
  created: function(){
    if (localStorage.getItem('access_token')) {
      this.page = ''
    } else {
      console.log('masuk login');
      
      this.page = 'login'
    } 
                       
  }
   
}
</script>

<style scoped>

</style>
