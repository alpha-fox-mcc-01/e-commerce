<template>
   <div>
    <!-- Button trigger modal -->
<button type="button" class="btn btn-primary mt-5" data-toggle="modal" data-target="#exampleModalCenter">
  Add Product
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Add Product</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
  <div class="form-group">
    <label for="exampleInputEmail1">Name</label>
    <input  class="form-control" aria-describedby="emailHelp" v-model="name">
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">Description</label>
    <input  class="form-control" aria-describedby="emailHelp" v-model="desc">
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">price</label>
    <input type="Number" class="form-control" aria-describedby="emailHelp" v-model="price">
    <small>input number only!</small>
  </div>
  <div class="form-group">
    <label for="exampleInputEmail1">stock</label>
    <input type="Number" class="form-control" aria-describedby="emailHelp" v-model="stock">
    <small>input number only!</small>
  </div>
   <div class="custom-file" >
          <input type="file" class="custom-file-input" id="customFile"  @change="fileChange"/>
          <label class="custom-file-label" for="customFile">{{imgName}}</label>
        </div>
  <button @click.prevent="addPost" type="submit" class="btn btn-primary mt-4" data-dismiss="modal">Submit</button>
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
name: 'addProduct',
data () {
  return {
    name: '',
    desc: '',
    price: 0,
    stock: 0,
    imgName: 'Choose file',
    image:''
  }
},
methods:{
  fileChange (event) {
          console.log(event.target.files[0], '<<>>')
          this.imgName = event.target.files[0].name
          this.image = event.target.files[0]
      },
  addPost(){

    // this.$emit('pageplus')
    let formData = new FormData();
    formData.append("image", this.image);
    formData.append("name", this.name);
    formData.append("desc", this.desc);
    formData.append("price", this.price);
    formData.append("stock", this.stock);
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
        method: 'post',
        url: '/product/add',
        headers: { 
            'access_token': userid,
            "Content-Type": "multipart/form-data"
              },
        data: formData
    })
        .then(({ data }) => {
            this.title = ''
            this.desc = ''
            this.img = ''
            this.publish = ''
            this.paragraf=''
            this.imgName='Choose file'
            console.log(data);
            
            this.$router.push('adminPage')

        })
        .catch(err => {
            
            console.log(err)

        })
}
}
}
</script>

<style>

</style>