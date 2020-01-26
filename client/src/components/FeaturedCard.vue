<template>
  <div>
    <b-card
      @click="log"
      :title="title"
      :img-src="product.imageUrl"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 16rem"
      class="mb-2"
    >
      <b-card-text>{{ product.description }}</b-card-text>
      <b-card-text>Rp {{ product.price.toLocaleString() }}</b-card-text>
      <b-button href="#" variant="primary">Selengkapnya</b-button>
    </b-card>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    product: Object
  },
  methods: {
    log () {
      console.log('featured di klik')
    }
  }
}
</script>

<style>
</style>
