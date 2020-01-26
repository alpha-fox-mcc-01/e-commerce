<template>
  <div class="container mt-5 mb-5">
    <div class="row">
       <div class="col">
        <img :src="item.image" alt="Product image" class="shadow"/>
       </div>
      <div class="col-lg-6 justify-content-center flex-row">
        <div class="container-fluid">
          <div class="row border-bottom">
            <div class="col-4 text-left">
              <h4>Nama</h4>
            </div>
            <div class="col-8 text-left product-name">
              <h3>{{ item.name }}</h3>
            </div>
          </div>
          <div class="row border-bottom mt-3">
            <div class="col-4 text-left">
              <h6>Description</h6>
            </div>
            <div class="col-8 text-left">
              <p>{{ item.description }}</p>
            </div>
          </div>
          <div class="row border-bottom mt-3">
            <div class="col-4 text-left">
              <h6>Price</h6>
            </div>
            <div class="col-8 text-left">
              <p>{{ item.price }}</p>
            </div>
          </div>
          <div class="row border-bottom mt-3">
            <div class="col-4 text-left">
              <h6>Stock</h6>
            </div>
            <div class="col-8 text-left">
              <p>{{ item.stock }}</p>
            </div>
          </div>
          <div class="row border-bottom">
            <div class="col-4 text-left">
              <form @submit.prevent="addToCart">
                <div class="form-group p-4">
                  <label for="quantity">Quantity</label>
                  <input
                    type="number"
                    class="form-control"
                    id="quantity"
                    min="1"
                    :max="item.stock"
                    v-model="quantity"
                  />
                  <input class="btn btn-danger mt-4" type="submit" value="Add to Cart" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: `ItemDetail`,
  data() {
    return {
      item: {},
      quantity: 1
    };
  },
  methods: {
    showItem() {
      axios({
        method: `GET`,
        url: `http://localhost:3000/items/${this.$route.params.itemId}`
      })
        .then(({ data }) => {
           console.log(data);
            this.item = data
        })
        .catch(err => {
          console.log(err.message)
        });
    },
    addToCart () {
       axios({
          method : `POST`,
          url : `http://localhost:3000/users/addcart`,
          data : {
             itemId : this.item._id,
             quantity : this.quantity
          },
          headers : {
             token : localStorage.getItem('token')
          }
       })
         .then (({data}) => {
            console.log(data);
            this.$router.push('/mycart')
         })
         .catch(err => {
            console.log(err.message);
         })
    }
  },
  created() {
    this.showItem();

  }
};
</script>

<style scoped>
img {
   max-width: 400px;
   max-height: 500px
}
</style>