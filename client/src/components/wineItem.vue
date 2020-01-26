<template>
<!-- <h1>masuk {{wine}}</h1> -->
<div class="col-sm mt-5" >
   <div class="card" style="width: 16rem;" >
          <img class=" mt-4" @click.prevent="detail(wine._id)" :src="wine.img" alt="Card image cap" />
     <div class="card-body">
          <h5 class="card-title mt-3">{{wine.name}}</h5>
          <h6 class="card-title mt-3">Rp. {{wine.price}}</h6>
          <a href="#" class="btn btn-primary" @click.prevent="addToCart(wine._id)">Add To Cart</a>
          </div>
          </div>
          </div>
</template>

<script>
import axios from '../api/axiosInstance'
export default {
  data () {
    return {}
  },
  props:{
    wine: Object
  },
  methods:{
    detail(id){
      this.$router.push(`/product/${id}`)
    },
    addToCart(id){
          axios({
        method: "post",
        url: "/user/add",
        data: {
          product: id
        },
        headers: {
          access_token : localStorage.getItem('access_token')
        }
      })
      .then(data => {
        console.log(data);
        this.$store.dispatch('getUser')
        
      })
      .catch(err =>{
        console.log(err);
        
      })
    }
  }
}
</script>

<style scoped>
img{
  max-height: 15rem;
  object-fit:contain;
}
/* .card-img-top{
  width: 100%;
  height: 40vh;
  object-fit: cover;
} */
</style>
