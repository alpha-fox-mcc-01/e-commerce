<template>
  <b-card
    style="background-color: rgba(255,255,255,0.6)"
    header="Featured Products"
    class="text-center homeFeatured"
    header-class="card_header"
  >
    <b-card-text>
      <b-card-group deck style="justify-content: center">
        <FeaturedCard v-for="item in arrObj" :title="item.title" />
      </b-card-group>
    </b-card-text>
  </b-card>
</template>

<script>
import FeaturedCard from '@/components/FeaturedCard.vue'
export default {
  data () {
    return {
      arrObj: [{ title: 'A' }, { title: 'B' }, { title: 'C' }, { title: 'D' }]
    }
  },
  components: {
    FeaturedCard
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
