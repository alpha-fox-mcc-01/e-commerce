<template>
  <div>
    {{ product }}
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ProductDetail',
  data () {
    return {
      product: {}
    }
  },
  methods: {
    getProduct () {
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
    this.getProduct()
  }
}
</script>

<style>
</style>
