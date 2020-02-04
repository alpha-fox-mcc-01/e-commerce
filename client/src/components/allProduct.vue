<template>
<div class="container">
  <!-- {{wines}} -->
  <div class="row mt-5" >
    <div class="col-sm mt-5" v-for="wine in wines" :key="wine.id" :wine="wine" >
  
   <div class="card" style="width: 16rem;" >

          <img class=" mt-4" @click.prevent="detail(wine._id)" :src="wine.img" alt="Card image cap" />
     <div class="card-body">
          <h5 class="card-title mt-3">{{wine.name}}</h5>
          <h6 class="card-title mt-3">Rp. {{wine.price}}</h6>
          <h6 class="card-title mt-3">Stock:  {{wine.stock}}</h6>
          <button class="btn btn-danger mt-2 mr-2" @click.prevent="deleteCart(wine._id)">delete</button>
          <button class="btn btn-warning ml-2 mt-2" data-toggle="modal" data-target="#ModalCenter" @click.prevent="getProduct(wine._id)">update</button>
          </div>
          </div>
          </div>
  </div>

<div class="modal fade" id="ModalCenter" tabindex="-1" role="dialog" aria-labelledby="ModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Update Product </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
  <div class="form-group">
    <label for="exampleInputEmail1">Name</label>
    <input  class="form-control" aria-describedby="emailHelp" v-model="name1">
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">Description</label>
    <input  class="form-control" aria-describedby="emailHelp" v-model="desc1">
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">price</label>
    <input type="Number" class="form-control" aria-describedby="emailHelp" v-model="price1">
    <small>input number only!</small>
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">stock</label>
    <input type="Number" class="form-control" aria-describedby="emailHelp" v-model="stock1">
    <small>input number only!</small>
  </div>
  <div class="form-group">
    <h6>current Image</h6>
    <img :src="imgName1" alt="">
  </div>
   <div class="custom-file" >
          <input type="file" class="custom-file-input" id="customFile"  @change="fileChange"/>
          <label class="custom-file-label" for="customFile">{{imgName1}}</label>
        </div>
  <button @click.prevent="addPost" type="submit" class="btn btn-primary mt-4" data-dismiss="modal">Update</button>
</form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script>
import axios from '../api/axiosInstance'
export default {
  data () {
    return {
      wines: [],
      item:{},
      name1: '',
      desc1: '',
      price1: 0,
      stock1: 0,
      imgName1: 'Choose zzzz file',
      image1:'',
      pr:''
    }
  },
  components:{
    // updateProduct
  },
methods:{
  fileChange (event) {
          console.log(event.target.files[0], '<<>>')
          this.imgName1 = event.target.files[0].name
          this.image1 = event.target.files[0]
      },
  addPost(){

    // this.$emit('pageplus')
    let formData = new FormData();
    formData.append("image", this.image1);
    formData.append("name", this.name1);
    formData.append("desc", this.desc1);
    formData.append("price", this.price1);
    formData.append("stock", this.stock1);
    console.log(">> formData >> ", formData);
    
    // const obj = {
    //     title: this.title,
    //     desc: this.desc,
    //     img: this.img,
    //     publish: this.publish,
    //     paragraf: this.paragraf
    // }
    let userid =  localStorage.getItem('access_token')

    console.log(this.paragraf)
    axios({
        method: 'put',
        url: `/product/update/${this.pr}`,
        headers: { 
            'access_token': userid,
            "Content-Type": "multipart/form-data"
              },
        data: formData
    })
        .then(({ data }) => {
          this.allProduct()
          console.log(data);
            
        })
        .catch(err => {
            this.alert = true
            console.log(err)

        })
},
  allProduct(){
      axios({
        method: "get",
        url: "/product/",
        headers: {
          access_token : localStorage.getItem('access_token')
        }
      })
      .then(({data}) =>{
        this.wines = data
        // console.log(data, 'dari data');
        // context.commit('setUserData', data.data)
      })
      .catch( err =>{
        console.log(err);
        
      })
  },
  getProduct(id){
    console.log(id, 'ini utk update product');
    this.pr = id
    axios({
        method: "get",
        url: `/product/${id}`,
        headers: {
          access_token : localStorage.getItem('access_token')
        }
      })
      .then(({data}) =>{
        this.item = data
            this.name1 = data.name
            this.desc1 = data.desc
            this.stock1 = data.stock
            this.price1 = data.price
            this.imgName1 = data.img
        // console.log(data, 'balikan one product');

        
        
      })
      .catch( err =>{
        console.log(err);
        
      })
    
  },
   deleteCart(id){
      console.log(id);
      axios({
        method: "delete",
        url: `/product/delete/${id}`,
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
          this.allProduct()


        })
        .catch(err => {
          console.log(err);
        });
    }
},
created: function(){
  this.allProduct()
}
}
</script>

<style scoped>
img{
  max-height: 15rem;
  object-fit:contain;
}
</style>