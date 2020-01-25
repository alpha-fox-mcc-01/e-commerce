<template>
    <div class="w-1/4 h-12">
      <div class="w-full max-w-sm overflow-hidden rounded shadow-lg">
        <img class="w-full" :src="product.image" alt="product image">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">{{product.name}}</div>
            <p class="text-gray-700 text-base">
              {{product.category}}
            </p>
            <p> IDR {{product.price}}</p>
            <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" @click="getDetails(product._id)">View Details</button>
          </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'ItemSingle',
  props: {
    product: Object
  },
  methods: {
    getDetails(product_id) {
      this.$router.push('/products/' + product_id)
    }

  }
}
</script>

<style scoped>
img {
  width: 200px;
  height: 300px;
  align-self: auto;
  margin: auto;
}
div {
  align-items: center;
}
</style>
