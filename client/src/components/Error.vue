<template>
  <div class="row error">
    <h3>{{ error }}</h3>
  </div>
</template>

<script>
export default {
  props: ['error']
}
</script>

<style scoped>
.error {
  width: 100%;
  text-align: center;
  margin: 0;
  padding: 0;
  justify-content: center;
  align-content: center;
  color: red;
}
</style>
