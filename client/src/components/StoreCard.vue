<template>
  <div class="col p-4">
    <div class="card shadow" style="width: 18rem;">
      <img
        class="card-img-top mb-2"
        :src="item.image"
      />
      <div class="card-body">
        <h5 class="card-title"><strong>{{item.name}}</strong></h5>
        <p class="card-text">
          <strong>Desrciption</strong>: {{item.description}}
        </p>
        <a href="#" class="btn btn-danger">See detail</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props : ['item']
}
</script>

<style scoped>
img {
  max-height: 30rem;
}
</style>
