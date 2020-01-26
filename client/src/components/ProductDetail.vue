<template>
  <div class="container mt-5 mb-5">
    <div class="row">
      <div class="col-lg-6 border mb-4 p-5 shadow">
        <img :src="product.image" alt="Product image">
      </div>
      <div class="col-lg-6 justify-content-center flex-row">
        <div class="container-fluid">
          <div class="row border-bottom">
            <div class="col-4 text-left">
              <h4>Nama</h4>
            </div>
            <div class="col-8 text-left product-name">
              <h3>{{ product.name }}</h3>
            </div>
          </div>
          <div class="row border-bottom">
            <div class="col-4 text-left">
              <h6>Description</h6>
            </div>
            <div class="col-8 text-left">
              <p>{{ product.description }}</p>
            </div>
          </div>
          <div class="row border-bottom">
            <div class="col-4 text-left">
              <h6>Price</h6>
            </div>
            <div class="col-8 text-left">
              <p>{{ product.price }}</p>
            </div>
          </div>
          <div class="row border-bottom">
            <div class="col-4 text-left">
              <h6>Stock</h6>
            </div>
            <div class="col-8 text-left">
              <p>{{ product.stock }}</p>
            </div>
          </div>
          <div class="row border-bottom">
            <div class="col-4 text-left">
              <form @submit.prevent="addToCart">
                <div class="form-group p-4">
                  <label for="quantity">Quantity</label>
                  <input type="number" class="form-control" id="quantity"
                    min="1"
                    :max="product.stock"
                    v-model="quantity"
                  >
                  <input class="btn btn-dark mt-3" type="submit" value="Add to Cart">
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
import axios from 'axios';

export default {
  name: 'ProductDetail',
  data() {
    return {
      product: {},
      quantity: 1,
    };
  },
  methods: {
    showProduct() {
      axios({
        method: 'GET',
        url: `http://localhost:3000/product/${this.$route.params.id}`,
      })
        .then(({ data }) => {
          this.product = data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addToCart() {
      const accessToken = localStorage.getItem('access_token');
      axios({
        method: 'POST',
        url: `http://localhost:3000/user/add/${this.$route.params.id}`,
        data: {
          quantity: this.quantity,
        },
        headers: {
          access_token: accessToken,
        },
      })
        .then((result) => {
          console.log(result);
          this.$store.dispatch('getUserCart');
          this.$router.push('/cart');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.showProduct();
  },
};
</script>

<style scoped>
  img {
    max-width: 100%;
  }

  .product-name {
    color: goldenrod;
  }
</style>
