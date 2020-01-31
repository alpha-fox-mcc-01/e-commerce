<template>
  <div id="store-items">
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
// import StoreCard from '../components/S
export default {
  name: `Store`,
  data () {
    return {

    }
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
