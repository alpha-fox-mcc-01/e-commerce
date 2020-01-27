<template>
  <div class='allProducts'>
    <CheckOutProduct v-for="product in cart" :key='product.product' :product='product'/>
    <b-button variant='checkout' @click='checkout'>Check Out</b-button>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from 'axios'
import CheckOutProduct from '@/components/CheckOutProduct'
export default {
  name: 'cartpage',
  computed: {
    cart () {
      return this.$store.state.cart
    }
  },
  methods: {
    checkout () {
      axios({
        method: 'DELETE',
        url: 'http://35.187.233.73/users/checkout',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      })
        .then(() => {
          Swal.fire('Success', 'Thank you for shopping here!', 'success')
        })
        .catch(err => {
          Swal.fire('Sorry', `Something went wrong: ${err.message}`, 'error')
        })
    }
  },
  components: {
    CheckOutProduct
  }
}
</script>

<style>

</style>
