<template>
  <tr>
    <!-- {{item}} -->
    <td class="product-thumbnail">
      <img :src="item.product.img" alt="Image" class="img-fluid" />
    </td>
    <td class="product-name">
      <h2 class="h5 cart-product-title text-black">{{item.product.name}}</h2>
    </td>
    <td>Rp. {{item.product.price}}</td>
    <td>{{item.jumlah}}</td>
    <td>Rp. {{total}}</td>
    <td>
      <a href="#" class="btn btn-primary height-auto btn-sm" @click.prevent="deleteCart(item.product._id)">X</a>
    </td>
  </tr>
</template>

<script>
name: 'itemCart'
import axios from '../api/axiosInstance'
export default {
  props:{
    item:Object
  },
  methods:{
    deleteCart(id){
      // console.log(id);
      axios({
        method: "delete",
        url: `/user/delete/${id}`,
        data: {
          email: this.email,
          password: this.password
        },
         headers: {
          access_token : localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          // this.$router.push('/')
          // this.$store.state.cartData
          this.$store.dispatch('getUser')


        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed:{
    total(){
      let t = (this.item.product.price * this.item.jumlah)
      return t
    }
  }
};
</script>

<style scoped>
img{
  max-height: 8rem;
  object-fit:contain;
}
</style>