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
        class="mb-2 mx-2 my-2"
      >
        <b-card-text>
          {{product.descriptions}}
        </b-card-text>

        <b-button @click="seeMore(product._id)" variant="primary">See More</b-button>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: Object
  },
  methods: {
    seeMore (_id) {
      this.$router.push(`/products/${_id}`).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style>

</style>
