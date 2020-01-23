<template>
  <div class="container">
    <h1>This is POST PAGES</h1>
    <div class="row">
      <div class="col-3">
        <Sidebar :products="products"/>
      </div>
      <div class="col-8">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar'
export default {
  name: 'ProductList',
  props: {
    products: Array
  },
  components: {
    Sidebar
  }
}
</script>

<style>

</style>
