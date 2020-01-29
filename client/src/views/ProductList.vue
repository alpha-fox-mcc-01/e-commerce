<template>
  <div class="container">
    <div class="row">
      <div class="col-4">
        <Sidebar :products="products"/>
      </div>
      <div class="col-8">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar'
import axios from 'axios'
export default {
  name: 'ProductList',
  data () {
    return {
      products: []
    }
  },
  methods: {
    getAllProducts () {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/products/all'
      })
        .then(({ data }) => {
          console.log(data)
          this.products = data
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  components: {
    Sidebar
  },
  created () {
    this.getAllProducts()
  }
}
</script>

<style>

</style>
