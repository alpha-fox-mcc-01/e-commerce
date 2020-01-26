<template>
  <div id="store-items">
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import StoreCard from '../components/StoreCard'
export default {
  name: `Store`,
  data () {
    return {

    }
  },
  components : {
    StoreCard
  },
  created () {
    this.$store.dispatch('getAllItem')
  },
  computed : {
    items () {
      return this.$store.state.items
    }
  }
};
</script>

<style>
</style>
