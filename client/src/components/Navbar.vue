<template>
    <div class="flex mb-4 flex-wrap" style="box-shadow: 0 2px 2px -2px rgba(0,0,0,.2);">
      <router-link to="/">Home</router-link>
      <router-link v-if="!isLoggedIn" to="/login">Login</router-link>
      <router-link v-if="!isLoggedIn"  to="/register">Register</router-link>
      <button v-if="isLoggedIn" @click="signOut">Sign Out</button>
      <div class="w-1/4 flex border-grey-light border">
      <input v-model="keyword" class="w-full rounded ml-1" type="text" placeholder="Search...">
      <button @click="searchItem" class="bg-grey-lightest border-grey border-l shadow hover:bg-grey-lightest">
        <span class="w-auto flex justify-end items-center text-grey p-2 hover:text-grey-darkest">
          <i class="material-icons text-xs">search</i>
        </span>
      </button>
      </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'NavBar',
  data () {
    return {
      keyword: ''
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.state.isLoggedIn
    }
  },
  methods: {
    searchItem () {
      this.$store.dispatch('searchItem', this.keyword)
    },
    signOut () {
      Swal.fire({
        title: 'Are you sure you want to log out?',
        text: 'You will lose the items in your cart',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, log me out!',
        cancelButtonText: 'No, keep me inside'
      })
      .then(result => {
        if (result.value) {
          this.$store.dispatch('logOut')
          localStorage.removeItem('access_token')
          localStorage.removeItem('username')
          this.$router.push('/')
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Your items in cart are safe :)',
            'error'
          )
        }
      })
    }
    // isLoggedIn () {
    //   if (localStorage.getItem('access_token')) {
    //     this.loggedIn = true
    //   } else {
    //     this.loggedIn = false
    //   }
    // }
  },
  created: function () {
    this.isLoggedIn()
  }
}
</script>

<style scoped>
div {
  text-align: center;
  box-shadow: 0 10px 10px -2px rgba(0,0,0,.2);
  margin-bottom: 1em;
  align-items: center;
  justify-content: space-evenly;
  position: sticky;
  position: -webkit-sticky;
  top: 0;
  background-color: white;
}
a, h1 {
  text-align: center;
  font-family: 'Open Sans', sans-serif;
  font-weight: 300;
  font-size: 18px;
}
a:hover {
  background-color: rgb(245, 227, 231);
}

li {
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
}
</style>
