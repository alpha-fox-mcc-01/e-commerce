<template>
  <div class="container mt-5">

    <h1>our products</h1>
    <h5>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi, perspiciatis!</h5>
  <router-view :wines="wines"/>
    <!-- <div class="row mt-5">

        <wineItem 
        v-for="wine in wines" :key="wine.id" 
        :wine="wine"
        />

    </div> -->
  </div>
</template>

<script>
import axios from '../api/axiosInstance'
export default {
  name: 'winesPage',
  data () {
    return {
      wines: []
    }
  },
  components: {
  },
  methods: {
    getWines () {
      axios({
        method: 'get',
        url: '/product'
      })
        .then(({ data }) => {
          // handle success
          this.wines = data
          console.log(data, 'fetch winess')
        })
        .catch(error => {
          // handle error
          console.log(error)
        })
    }
  },
  created: function () {
    this.getWines()
  }
}
</script>

<style>
</style>


