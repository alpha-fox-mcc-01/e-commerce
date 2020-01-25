<template>
   <div id="box" class="flex mb-4 flex-shrink-0">
     <div class="w-1/4">
     </div>
     <div id="image" class="w-1/4">
     <p id="category">home/ products / {{product.category}} / {{product.name.toLowerCase()}}</p>
      <img :src="product.image" alt="product image">
     </div>
     <div id="description" class="w-1/4">
        <h3> {{product.name}} </h3>
        <h4> What it is: </h4>
        <br/>
        <p>{{product.description}}</p>
        <br/>
        <h4>Good to know: </h4>
        <p> hypoallergenic, dermatologist tested, paraben free, alcohol free, cruelty free, vegan, non-irritating</p>
        <div>
        <br/><br/><br/>
        <button class="bg-black hover:bg-red-200 text-white font-bold py-2 px-4 rounded">
          ADD TO CART -- IDR {{product.price}}
        </button>
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
  padding-right: 3em;
  padding-top: 1em;
}
#description {
  padding-top: 2em;
  flex-basis: 40%;
  text-align: left;
}
img {
  max-width: 300px;
  max-width: 100%;
}

h3 {
  font-size: 28px;
  font-weight: bold;
  color: black;
}
h4 {
  font-weight: bold;
  color: black;
}

div {
  font-family: 'Open Sans', sans-serif;
}

#category {
  float: left;
  font-size: 12px;
}
</style>
