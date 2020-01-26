<template>
  <div>
    <ItemDetail />
    <b-card
      :title="title"
      :img-src="product.imageUrl"
      img-top
      style="min-width: 14rem; max-width: 14rem; margin: 0 1.5rem 2rem 0; text-align: left"
      class="productItem"
      title-class="prodTitle"
      header-class="prodTitle"
    >
      <b-card-text>Rp {{ product.price.toLocaleString() }}</b-card-text>
      <b-button :to="`/product/${product._id}`" variant="primary">Detail</b-button>
    </b-card>
  </div>
</template>

<script>
import ItemDetail from '@/components/ItemDetail'

export default {
  props: {
    title: String,
    product: Object
  },
  components: {
    ItemDetail
  },
  methods: {
    show () {
      this.$modal.show('item-detail')
    },
    hide () {
      this.$modal.hide('item-detail')
    }
  }
}
</script>

<style>
.prodTitle {
  font-size: 3rem;
  color: red;
}
</style>
