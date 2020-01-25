<template>
   <div id="box" class="flex mb-4 flex-shrink-0">
     <div class="w-1/4">
     </div>
     <div id="image" class="w-1/4">
      <img :src="product.image" alt="product image">
     </div>
     <div id="description" class="w-1/4">
        <h3> {{product.name}} </h3>
        <p>{{product.description}}</p>
        <p>IDR {{product.price}}</p>
        <div>
        <button class='relative bg-blue-500 text-white p-6 rounded font-bold overflow-visible'>
          Add to cart
          <div class="absolute top-0 right-0 -mt-4 -mr-4 px-4 py-1 bg-red-500 rounded-full">1</div>
        </button>
        <br/><br/><br/>
        </div>
     </div>
     <div class="w-1/4">
     </div>
   </div>
</template>

<script>

export default {
  name: 'ProductDetails',
  computed: {
    product () {
      return this.$store.state.product
    }
  },
  created: function () {
    this.$store.dispatch('getDetail', this.$route.params.id)
  }

}
</script>

<style scoped>
#image {
  flex-basis: 40%;
  justify-content: baseline;
}
#description {
  flex-basis: 40%;
  align-items: center;
}
img {
  max-width: 300px;
  max-width: 100%;
}

h3 {
  font-size: 28px;
}
</style>
