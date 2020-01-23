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
    <li class="nav-item">
      <router-link to="home">Home</router-link>
    </li>
    <li class="nav-item">
      <router-link to="about">About</router-link>
    </li>
    <li class="nav-item">
      <router-link to="wines">Wines</router-link>
    </li>
    <li class="nav-item">
     <router-link to="contact">Contact</router-link>
    </li>
  </ul>
</nav>
</div>
</div>
</template>

<script>

export default {
  name: 'navbarhome'
}
</script>

<style scoped>

</style>
