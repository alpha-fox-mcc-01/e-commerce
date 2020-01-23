<template>
  <div class="home">
    <Slider />
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<script>
// @ is an alias to /src
import Slider from '../components/Carousel'
export default {
  name: 'home',
  components: {
    Slider
  }
}
</script>
