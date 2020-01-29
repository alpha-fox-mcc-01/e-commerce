<template>
  <div class="container w-50">
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
    <div id="sizing">
      <!-- Text slides with image -->
      <b-carousel-slide
        v-for="product in products"
        :caption="product.name"
        :text="product.description"
        :img-src="product.imageUrl"
        :key="product._id"
      ></b-carousel-slide>
    </div>
    </b-carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      slide: 0,
      sliding: null
    }
  },
  props: {
    products: Array
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    }
  }
}
</script>

<style scoped>
#sizing {
  max-height: 100px !important
}
</style>
