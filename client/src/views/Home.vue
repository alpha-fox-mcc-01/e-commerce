<template>
  <div class="home">
    <navbarHome/>
    <carouselHome/>
    <productShowcase/>
    <parallaxProm/>
    <reviewSection/>
    <footerHome/>
  </div>
</template>

<script>

// @ is an alias to /src
import navbarHome from '@/components/navbarHome.vue'
import carouselHome from '@/components/carouselHome.vue'
import productShowcase from '@/components/productShowcase'
import parallaxProm from '@/components/parallaxProm'
import reviewSection from '@/components/reviewSection'
import footerHome from '@/components/footerHome'
export default {
  name: 'home',
  components: {
    navbarHome,
    carouselHome,
    productShowcase,
    parallaxProm,
    reviewSection,
    footerHome
  }
}
</script>
