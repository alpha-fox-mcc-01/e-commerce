<template>
  <div class="container">
    <div class="row">
      <div class="col-sm">
        <wineItem v-for="wine in wines" :key="wine.id" />
      </div>
    </div>
  </div>
</template>

<script>
import wineItem from '@/components/wineItem'
import axios from '../api/axiosInstance'
export default {
  name: 'winesPage',
  data () {
    return {
      wines: []
    }
  },
  components: {
    wineItem
  },
  methods: {
    getWines () {
      axios({
        method: 'GET',
        url: `/product`
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
