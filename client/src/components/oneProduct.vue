<template>
  <div>
    <!-- {{oneProduct}} -->
    <b-jumbotron :header="oneProduct.name" :lead="'Rp ' + oneProduct.price">
      <p>{{oneProduct.description}}</p>
      <b-button variant="primary" href="#">Add to cart</b-button>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  name: 'oneProduct',
  methods: {
    fetchOneProduct () {
      this.$store.dispatch('fetchOneProduct', this.$route.params.id)
    }
  },
  created () {
    this.fetchOneProduct()
  },
  computed: {
    oneProduct () {
      return this.$store.state.oneProduct
    }
  },
  watch: {
    $route (to, from) {
      this.fetchOneProduct()
    }
  }
}
</script>

<style>

</style>
