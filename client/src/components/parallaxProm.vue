<template>
<div class="is-parallax is-fixed mt-5 mb-5">
<parallax>
    <h1>
    patuh kepada orang tua</h1>
    <img src="../assets/hero_1.jpg" alt="very cool bg" v-text="text2" >
     <div class="carousel-caption d-none d-md-block">
    </div>
  </parallax>
</div>

</template>

<script>
import Parallax from 'vue-parallaxy'
export default {
  name: 'parallaxProm',
  data () {
    return {
      text2: 'patuh kepada orang tua'
    }
  },
  components: {
    Parallax
  }
}
</script>

<style scoped>
parallax{
  parallax: true;
  fixed: true;
  direction: down;
}
img{
    max-height: 55rem
}

</style>
