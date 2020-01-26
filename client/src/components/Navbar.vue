<template>
  <div>
    <b-navbar toggleable="lg" type="dark" style="background-color:#333;">
      <b-navbar-brand href="#">LOGO</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="navMenuContainer">
          <router-link class="navMenu" to="/">Home</router-link>
          <router-link class="navMenu" to="/product">Product</router-link>
          <router-link class="navMenu" to="/about">About</router-link>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <!-- <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>-->
          <b-button
            v-if="!access_token"
            variant="outline-primary"
            size="sm"
            class="ml-4 my-2 my-sm-0"
            @click.prevent="show"
          >Login</b-button>

          <b-nav-item-dropdown v-if="access_token" text="User" right>
            <b-dropdown-item @click="toCart">Cart</b-dropdown-item>
            <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <Login @got-error="catchError" />
  </div>
</template>

<script>
import Login from '@/components/Login.vue'
export default {
  props: ['access_token', 'error'],
  components: {
    Login
  },
  methods: {
    show () {
      this.$modal.show('login')
    },
    hide () {
      this.$modal.hide('login')
    },
    logout () {
      this.$store.commit('removeToken')
      this.$router.push('/')
    },
    catchError(err) {
      this.$emit('error-message', err)
    },
    toCart() {
      this.$router.push('/cart')
    }
  }
}
</script>

<style>
.navMenu {
  padding: 8px 10px;
  margin: 0 10px;
  color: white;
  font-weight: 700;
  transition: all 0.3s ease-in;
}

.navMenu:hover {
  background-color: white;
  border: none;
  border-radius: 1.2rem;
  text-decoration: none;
  color: black;
}

.navMenu:active {
  background-color: black;
  color: white;
}
</style>
