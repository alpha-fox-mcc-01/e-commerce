<template>
  <div class="home">
    <!-- <NavbarCustomer/> -->
    <CarouselSayang/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import NavbarCustomer from "../components/NavbarCustomer"
import CarouselSayang from "../components/CarouselSayang"
export default {
  name: 'home',
  components: {
    HelloWorld,
    NavbarCustomer,
    CarouselSayang
  },
  created () {
    this.$store.dispatch('getAllItem')
    if (localStorage.getItem('token')) {
      this.$store.dispatch('getCart')
    }
  }
}
</script>
