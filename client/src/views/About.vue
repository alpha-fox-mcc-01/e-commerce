<template>
  <div class="about">
    <h1>This is an about page</h1>
    <ItemDetail />
    <button @click="show">SHOW</button>
    <button @click="hide">HIDE</button>
  </div>
</template>

<script>
import ItemDetail from '@/components/ItemDetail'
export default {
  methods: {
    show () {
      this.$modal.show('hello-world');
    },
    hide () {
      this.$modal.hide('hello-world');
    }
  },
  components: {
    ItemDetail
  }
}
</script>

<style>
</style>