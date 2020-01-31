<template>
  <div class="row">
    <StoreCard v-for="item in items" :key="item._id" :item="item" />
  </div>
</template>

<script>
import StoreCard from "./StoreCard";
export default {
  name: `Store`,
  data() {
    return {
      
    };
  },
  components: {
    StoreCard
  },
  created() {
    this.$store.dispatch("getAllItem");
  },
  computed: {
    items() {
      return this.$store.state.items;
    }
  }
};
</script>

<style>
</style>