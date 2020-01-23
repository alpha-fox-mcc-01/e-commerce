<template>
  <div class="container mt-5 mb-5">
    <carousel>
      <slide>
        <img src="../assets/wine_1.png" alt />
        <div>
          <h3 class="heading mb-1">
            <a href="#" @click.prevent="showDetail">Trius Cabernet France 2011</a>
          </h3>
          <span class="price">$629.00</span>
        </div>
      </slide>
      <slide>
        <img src="../assets/wine_2.png" alt />
        <div>
          <h3 class="heading mb-1">
            <a href="#">sirup marjan 300ml</a>
          </h3>
          <span class="price">$9.00</span>
        </div>
      </slide>
      <slide>
        <img src="../assets/wine_3.png" alt />
        <div>
          <h3 class="heading mb-1">
            <a href="#">sirup abc 2ltr</a>
          </h3>
          <span class="price">$69.00</span>
        </div>
      </slide>
      <slide>
        <img src="../assets/wine_4.png" alt />
        <div>
          <h3 class="heading mb-1">
            <a href="#">Orang Tua</a>
          </h3>
          <span class="price">$harga temen</span>
        </div>
      </slide>
    </carousel>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
export default {
  name: 'productShowcase',
  data () {
    return {}
  },
  components: {
    Carousel,
    Slide
  },
  methods: {
    showDetail () {
      this.$router.push(`/product/123`)
    }
  }
}
</script>

<style scoped>
/* .container{
    max-width: 65rem
} */

slide {
  max-width: 35rem;
}

img {
  max-height: 15rem;
}
</style>
