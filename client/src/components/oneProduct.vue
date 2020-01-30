<template>
  <div>
    <b-jumbotron :header="oneProduct.name" :lead="'Rp ' + oneProduct.price">
      <p>{{oneProduct.description}}</p>
      <b-button variant="primary" @click.prevent="addChart(oneProduct._id)">Add to cart</b-button>
    </b-jumbotron>
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
  name: 'oneProduct',
  data () {
    return {
      quantity: '',
      productId: '',
      token: ''
    }
  },
  methods: {
    fetchOneProduct () {
      this.$store.dispatch('fetchOneProduct', this.$route.params.id)
    },
    addChart (productId) {
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
        .then(({ data }) => {
          console.log(data)
          this.quantity = ''
          this.makeToast(data)
        })
        .catch(err => {
          console.log(err.response)
        })
    }
  },
  created () {
    this.fetchOneProduct()
  },
  computed: {
    oneProduct () {
      return this.$store.state.oneProduct
    },
    idUser () {
      return this.$store.state.idUser
    }
  },
  watch: {
    $route (to, from) {
      this.fetchOneProduct()
    }
  }
}
</script>

<style>

</style>
