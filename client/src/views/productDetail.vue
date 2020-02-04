<template>
  <div class="container mt-5">
    Product Detail
    <!-- {{Detail}} -->
    <div class="row mt-5">
    <div class="col-sm-5">
      <img :src="Detail.img" alt="Card image cap" />
    </div>
   <div class="col-sm-2 text-left mt-5">  
      <h4>Name:</h4>
      <hr>
      <h4>Desc:</h4>
      <hr>
      <h4>Price:</h4>
      <hr>
    </div>
    <div class="col-sm-5 text-left mt-5">  
      <h4>{{Detail.name}}</h4>
      <hr>
      <h5>{{Detail.desc}}</h5>
      <hr>
      <h4>{{Detail.price}}</h4>
      <hr>
       <a href="#" class="btn btn-primary" @click.prevent="addToCart(Detail._id)">Add To Cart</a>
    </div>
  </div>

  </div>
</template>

<script>
import axios from '../api/axiosInstance'
export default {
  data () {
    return {
      Detail:{}
    }
  },
  methods:{
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
  },
  created: function(){
      console.log('ada lho', this.$route.params.id);
      let pr = this.$route.params.id
      axios({
        method: "get",
        url: `/product/${pr}`,
         headers: {
          access_token : localStorage.getItem('access_token')
        }
      })
        .then(({ data }) => {
          this.Detail = data
          // this.$store.dispatch('getUser')
        })
        .catch(err => {
          console.log(err);
        });
  }
}
</script>

<style scoped>
img{
  max-height: 20rem;
}
</style>