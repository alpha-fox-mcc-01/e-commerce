<template>
  <div>
    <h1>This is POST PAGES</h1>
    <div class="row">
      <div class="col-3">
        <Sidebar />
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar'
export default {
  name: 'ProductList',
  components: {
    Sidebar
  }
}
</script>

<style>

</style>
