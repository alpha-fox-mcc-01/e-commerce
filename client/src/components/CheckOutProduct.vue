<template>
  <div class='card'>
    <div class='card-title'>{{ product.product.name }}</div>
    <div class='card-body'>
      <img :src="product.product.featured_image">
      <h5>{{ product.product.price }}</h5>
      <b-button variant='danger' @click='removeProduct(product.product._id)'>Remove</b-button>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from 'axios'
export default {
  name: 'checkoutproduct',
  props: {
    product: Object
  },
  methods: {
    removeProduct (id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          axios({
            method: 'DELETE',
            url: 'http://localhost:3000/users/cart',
            headers: {
              access_token: localStorage.getItem('access_token')
            },
            data: {
              productId: id
            }
          })
            .then(() => {
              Swal.fire('Success', 'Item Removed from Cart!', 'success')
            })
            .catch(err => {
              Swal.fire('Sorry', `Something went wrong: ${err.message}`, 'error')
            })
        }
      })
    }
  }
}
</script>

<style>

</style>
