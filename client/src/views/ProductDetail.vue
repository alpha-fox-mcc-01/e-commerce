<template>
  <div class='row' style="height:50vh;">
    <div class='col-md-4' id='image-col'>
      <img :src="`${product.featured_image}`" width="400" height="500" />
    </div>
    <div class='col-md-8'>
      <transition name="slide-fade">
        <div id='product-info'>
          <h1>{{ product.name }}</h1>
          <h6>{{ product.category }}</h6>
          <p>{{ product.description }}</p>
          <h3>Rp. {{ product.price.toLocaleString() }}</h3>
          <p>Stocks Remaining: {{ product.stocks }}</p>
          <form @submit.prevent="addToCart(product._id)">
            <input style='width: 12%;' v-model='product.quantity' type="number" class="form-control" placeholder="Quantity" required><br>
            <button class="btn btn-light" type='submit'>Add To Cart</button>
          </form>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from 'axios'
export default {
  data () {
    return {
      product: {
        name: '',
        description: '',
        featured_image: '',
        category: '',
        price: '',
        stocks: '',
        quantity: 0
      }
    }
  },
  methods: {
    getDetail () {
      axios({
        method: 'GET',
        url: `http://35.187.233.73/products/${this.$route.params.id}`
      })
        .then(({ data }) => {
          this.product = data
        })
        .catch(err => {
          console.log(err)
        })
    },
    addToCart (id) {
      axios({
        method: 'POST',
        url: 'http://35.187.233.73/users/cart',
        headers: {
          access_token: localStorage.getItem('access_token')
        },
        data: {
          productId: id,
          quantity: this.product.quantity
        }
      })
        .then(({ data }) => {
          this.product.quantity = 0
          this.$store.dispatch('getCart')
          Swal.fire('Success', 'Item Added to Cart!', 'success')
        })
        .catch(err => {
          console.log(err)
          // Swal.fire({
          //   icon: 'error',
          //   title: 'Error',
          //   text: `Sorry, something went wrong: ${err}`
          // })
        })
    }
  },
  created () {
    this.getDetail()
  }
}
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
.btn.btn-light {
  color: indigo;
  border-color: indigo;
}
.row {
  font-family: 'Quicksand', sans-serif;
}
img {
  margin-top: 5rem;
  margin-left: auto;
  margin-right: auto;
}
#product-info {
  margin: 0 auto;
}
.col-md-4 {
  display: flex;
  align-items: top;
}
.col-md-8 {
  display: flex;
  align-items: center;
}

#image-col {
  border-right: solid rgb(211, 210, 210);
}
</style>
