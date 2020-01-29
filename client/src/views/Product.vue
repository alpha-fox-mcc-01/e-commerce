<template>
  <div>
    <div class="jumbotron jumbotron-fluid m-0">
    </div>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Product',
};
</script>

<style scoped>
  .jumbotron{
    background-image: url('https://mmc.tirto.id/image/2019/08/30/uniqlo_ratio-16x9.jpg');
    background-position: center;
    background-size: 100%;
    min-height: 17rem;
  }
</style>
