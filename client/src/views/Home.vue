<template>
  <div class="home">
    <carouselHome/>
    <productShowcase/>
    <parallaxProm/>
    <reviewSection/>
  </div>
</template>

<script>

// @ is an alias to /src

import carouselHome from '@/components/carouselHome.vue'
import productShowcase from '@/components/productShowcase'
import parallaxProm from '@/components/parallaxProm'
import reviewSection from '@/components/reviewSection'
export default {
  name: 'home',
  components: {
    carouselHome,
    productShowcase,
    parallaxProm,
    reviewSection,
  },
  created: function(){
    if(localStorage.getItem('access_token')){
      this.$store.dispatch('getUser')
    }  
                       
  }
}
</script>
