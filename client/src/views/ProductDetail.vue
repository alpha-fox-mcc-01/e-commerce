<template>
  <div class='row' style="height:100vh;">
    <div class='col-md-4' id='image-col'>
      <img :src="`${this.product.featured_image}`" width="400" height="500" />
    </div>
    <div class='col-md-8'>
      <div id='product-info'>
        <h1>{{ this.product.name }}</h1>
        <h6>{{ this.product.category }}</h6>
        <p>{{ this.product.description }}</p>
        <h3>Rp. {{ this.product.price.toLocaleString() }}</h3>
        <p>Stocks Remaining: {{ this.product.stocks }}</p>
        <button type='submit'>Add to Cart</button>
      </div>
    </div>
  </div>
</template>

<script>
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
        stocks: ''
      }
    }
  },
  methods: {
    getDetail () {
      console.log(this.$route.params.id)
      axios({
        method: 'GET',
        url: `http://localhost:3000/products/${this.$route.params.id}`
      })
        .then(({ data }) => {
          this.product = data
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.getDetail()
  }
}
</script>

<style scoped>
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
  border-right: solid grey;
}
</style>
