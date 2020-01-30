<template>
  <div>
    <div class="container">
      <b-navbar toggleable="lg" type="light" variant="light">
        <b-navbar-brand href="#" @click.prevent="goHome">
          <img src="../assets/mini.png" alt="logo" style="height: 3rem;">
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-navbar-nav>
              <b-nav-item href="#">
                <router-link to="/">Home</router-link>
                Cart: {{ chart }}
              </b-nav-item>
          </b-navbar-nav>
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template v-slot:button-content>
                <em>User</em>
                <!-- <b-img v-bind="mainProps" rounded="circle" alt="Circle image"></b-img> -->
              </template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item href="#" @click.prevent="logout">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  data () {
    return {
      // mainProps: { blank: true, blankColor: '#777', width: 50, height: 50, class: 'm1' }
    }
  },
  methods: {
    goHome () {
      this.$router.push({ name: 'home' })
    },
    logout () {
      localStorage.clear()
      this.$router.push({ name: 'login' })
    }
  },
  computed: {
    chart () {
      return this.$store.state.currentUserData.cartLists.length
    }
  }
}
</script>

<style>

</style>
