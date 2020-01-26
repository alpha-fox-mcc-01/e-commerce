<template>
  <div>
    <!-- {{products}} -->
    <b-container fluid="sm">
    <b-row class="justify-content-center">
      <b-col 
        sm="4"
        v-for="product in products"
        :key="product._id"
        ><b-card
          :title="product.name"
          :img-src="product.image"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2"
        >
          <b-card-text>
            {{product.description}}
          </b-card-text>
          <b-button href="#" variant="info" class="mx-2">View details</b-button> 
          <b-button href="#" variant="primary">Add to Cart</b-button>
        </b-card>
      </b-col >
    </b-row>
  </b-container>
  </div>
</template>

<script>
export default {
  name: 'product',
  computed: {
    products () {
      return this.$store.state.products
    }
  }
}
</script>

<style>
  b-card{
    object-fit: cover;
  }
</style>
