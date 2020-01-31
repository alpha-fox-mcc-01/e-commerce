<template>
  <div class="col-4 p-4">
    <div class="card shadow" style="width: 18rem; cursor: pointer;" @click="getItemDetail(item._id)">
      <img
        class="card-img-top mb-2"
        :src="item.image"
      />
      <div class="card-body">
        <h5 class="card-title"><strong>{{item.name}}</strong></h5>
        <p class="card-text">
          {{item.description}}
        </p>
        <!-- <a href="#" class="btn btn-danger">See detail</a> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name : `StoreCard`,
  props : ['item'],
  methods : {
    getItemDetail (itemId) {
      this.$router.push(`/store/${itemId}`)
    }
  }
}
</script>

<style scoped>
img {
  max-height: 30rem;
}
</style>
