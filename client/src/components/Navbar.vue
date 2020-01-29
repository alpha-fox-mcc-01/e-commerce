<template>
  <div id="nav" class="fixed-top">
    <b-navbar toggleable="md" type="light">
      <b-navbar-brand href="#">G-Shop</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <div class="col-md-auto">
            <router-link to="/">Home </router-link>
          </div>
          <div class="col-md-auto">
            <router-link to="/products"> Product</router-link>
          </div>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>
            <router-link to="/carts">Carts</router-link>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
#nav {
 background-color: aliceblue;
}

</style>
