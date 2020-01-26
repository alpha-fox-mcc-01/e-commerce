<template>
  <b-card
    style="background-color: rgba(255,255,255,0.6)"
    header="Featured Products"
    class="text-center homeFeatured"
    header-class="card_header"
  >
    <b-card-text>
      <b-card-group deck style="justify-content: center">
        <FeaturedCard
          v-for="(product, i) in products"
          :key="i"
          :title="product.name"
          :product="product"
          v-if="i <=3"
        />
      </b-card-group>
    </b-card-text>
  </b-card>
</template>

<script>
import FeaturedCard from '@/components/FeaturedCard.vue'
export default {
  components: {
    FeaturedCard
  },
  props: {
    products: Array
  }
}
</script>

<style>
.homeFeatured {
  margin: 5%;
}

.card_header {
  font-size: 1.5rem;
  font-weight: 700;
  color: black;
}
</style>
