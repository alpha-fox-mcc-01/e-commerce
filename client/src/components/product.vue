<template>
  <div>
    <!-- {{products}} -->
    <b-container fluid="sm">
    <b-row class="justify-content-center">
      <b-col
        sm="4"
        v-for="product in products"
        :key="product._id"
        ><b-card
          :title="product.name"
          :img-src="product.image"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2"
        >
          <b-card-text>
            {{product.description}}
          </b-card-text>
          <b-button href="#" variant="info" class="mx-2" :to="`/product/${product._id}`">View details</b-button>
          <b-button href="#" variant="primary" @click.prevent="addCart(product._id)">Add to Cart</b-button>
        </b-card>
      </b-col >
    </b-row>
  </b-container>
  <div>
    <b-modal id="addCart" hide-footer>
      <template v-slot:modal-title>
        Add Product to Cart
      </template>
      <div class="d-block text-center">
        <p>Choose quantity you want to add</p>
        <b-form-input type="number" v-model="quantity" placeholder="0"></b-form-input>
      </div> 
      <b-button class="mt-3 mx-2" @click.prevent="$bvModal.hide('addCart')">Close</b-button>
      <b-button class="mt-3 mx-2" @click.prevent="addToCart">Add to cart</b-button>
    </b-modal>
  </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'product',
  data() {
    return {
      quantity: '',
      productId: '',
      token: ''
    }
  },
  computed: {
    products () {
      return this.$store.state.products
    },
    idUser () {
      return this.$store.state.idUser
    }
  },
  methods: {
    addCart (productId) {
      this.productId = productId
      this.token = localStorage.getItem('access_token')
      this.$bvModal.show('addCart')
    },
    addToCart () {
      this.$bvModal.hide('addCart')
      axios({
        method: 'post',
        url: `http://localhost:3000/cart/${this.idUser}`,
        headers: {
          token: this.token
        },
        data: {
          productId: this.productId,
          quantity: this.quantity
        }
      })
        .then (({ data }) => {
          console.log(data)
          this.quantity = ''
        })
        .catch (err => {
          console.log(err.response)
        })
    }
  },
}
</script>

<style>
  b-card{
    object-fit: cover;
  }
</style>
