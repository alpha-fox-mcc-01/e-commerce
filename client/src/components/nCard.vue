<template>
  <div>
    <b-card
      :title="product.name"
      :img-src="product.image"
      img-alt="Image"
      img-style="max-height: 15rem;"
      img-top
      tag="article"
      style="max-width: 20rem;"
      class="mb-2"
    >
      <b-card-text>
        Rp {{product.price}}
      </b-card-text>
      <b-button href="#" variant="info" class="mx-2" :to="`/product/${product._id}`">View details</b-button>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'nCard',
  props: ['product']
}
</script>

<style>

</style>
