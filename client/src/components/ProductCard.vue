<template>
  <div>
    <div>
    <b-card
      :title="product.name"
      :img-src="product.imageUrl"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem;"
      class="mb-2"
    >
      <b-card-text>
        {{product.descriptions}}
      </b-card-text>

      <b-button :to="`/products/${product._id}`" variant="primary">See More</b-button>
    </b-card>
  </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: Object
  }
}
</script>

<style>

</style>
