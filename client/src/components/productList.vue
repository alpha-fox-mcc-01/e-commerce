<template>
  <div class="row mt-5">
    <wineItem 
    v-for="wine in wines" :key="wine.id" :wine="wine" 
    />
  </div>
</template>

<script>
import wineItem from '@/components/wineItem'
export default {
  props:{
    wines: Array
  },
  components:{
    wineItem
  }
};
</script>

<style>
</style>