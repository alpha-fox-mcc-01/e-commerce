<template>
  <div>
    ini laman details
    <router-view/>
    {{ data }}
  </div>
</template>

<script>
export default {
  name: 'detailsProduct',
  data() {
    return {
      data: this.$route.params
    }
  },
}
</script>

<style>

</style>