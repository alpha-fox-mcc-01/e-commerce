<template>
<div>
  <div class="site-section  pb-0">
      <div class="container">
        <div class="row mb-5 justify-content-center">
          <div class="col-7 section-title text-center mb-5">
            <h2 class="d-block">Cart</h2>
          </div>
        </div>
        <div class="row mb-5">
          <form class="col-md-12" method="post">
            <div class="site-blocks-table">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th class="product-thumbnail">Image</th>
                    <th class="product-name">Product</th>
                    <th class="product-price">Price</th>
                    <th class="product-quantity">Quantity</th>
                    <th class="product-total">Total</th>
                    <th class="product-remove">Remove</th>
                  </tr>
                </thead>
                <tbody>

                  <itemCart
                  v-for="item in cartData" :key="item.id" :item="item"
                  />
                  

                 
    
                </tbody>
              </table>
            </div>
          </form>
        </div>
    
      </div>
    </div>

     <div class="row justify-content-center">
              <div class="col-md-4">
                <div class="row">
                  <div class="col-md-12 border-bottom mb-5">
                    <h3 class="text-black h4 text-uppercase">Cart Totals</h3>
                  </div>
                </div>
                <div class="row mb-5">
                  <div class="col-md-6">
                    <span class="text-black">Total</span>
                  </div>
                  <div class="col-md-6 text-right">
                    <strong class="text-black">Rp. {{totalPrice}}</strong>
                  </div>
                </div>
    
                <div class="row">
                  <div class="col-md-12">
                    <button class="btn btn-primary btn-lg btn-block" @click.prevent="checkout">Proceed To
                      Checkout</button>
                  </div>
                </div>
                <!-- {{cartData}} -->
                <!-- {{setDaftar}} -->
              </div>
            </div>
          </div>

</template>

<script>
name: 'mayCart'
import itemCart from '../components/itemCart'
import axios from '../api/axiosInstance'
export default {
  data () {
    return {
      cart: [],
      totalharga: 0,
      daftar:[]
    }
  },
  methods:{
    checkout(){
      console.log(localStorage.getItem('access_token'), 'test node mailer');
      
      axios({
        method: "post",
        url: "/user/checkout",
        data: {
          total: this.totalPrice,
          daftar: this.setDaftar
        },
        headers: {
          access_token : localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          console.log(data);
          this.$router.push('/')
          
        })
        .catch(err => {
          console.log(err);
        });
    }
  },  
  computed:{
    cartData () {
      console.log(this.$store.state.cartData, 'cartnya ini')
      this.cart = this.$store.state.cartData

      return this.$store.state.cartData
    },
    totalPrice(){
      this.totalharga = 0
      let arr = this.$store.state.cartData
      arr.forEach(el => this.totalharga+= (el.product.price * el.jumlah));

     return this.totalharga
    },
    setDaftar(){
      // this.totalharga = 0
      let arr = this.$store.state.cartData
      arr.forEach(el => this.daftar.push(el.product._id));
      console.log(this.daftar);
      
     return this.daftar
    }
  },
  components:{
    itemCart
  },
  created: function(){
    if(localStorage.getItem('access_token')){
      this.$store.dispatch('getUser')
      this.cart = this.$store.state.cartData

    }  
                       
  }
}
</script>

<style>

</style>