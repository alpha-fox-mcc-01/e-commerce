<template>
   <div id="box" class="flex mb-4">
     <div class="w-1/4">
     </div>
     <div id="image" class="w-1/4">
      <img :src="product.image" alt="product image">
     </div>
     <div id="description" class="w-1/3">
      <h3> {{product.name}} </h3>
      <p>{{product.description}}</p>
      <p>{{product.price}}</p>
      <div>
      <button class='relative bg-blue-500 text-white p-6 rounded text-2xl font-bold overflow-visible'>
        Example button
        <div class="absolute top-0 right-0 -mt-4 -mr-4 px-4 py-1 bg-red-500 rounded-full">1</div>
      </button>
      <br/><br/><br/>
      <button class='relative bg-blue-500 text-white p-6 rounded text-2xl font-bold overflow-visible'>
        Example button
        <div class="absolute top-0 right-0 -mt-4 -mr-4 px-4 py-1 bg-red-500 rounded-full">2000</div>
      </button>
</div>
     </div>
   </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ProductDetails',
  data () {
    return {
      product: {}
    }
  },
  methods: {
    getDetail() {
      let params = this.$route.params.id
      console.log(params)
      axios.get(`http://localhost:3000/products/${params}`)
           .then(({data}) => {
             console.log(data.result)
             this.product = data.result
           })
           .catch(err => {
            console.log(err)
           })
    }
  },
  created: function () {
    this.getDetail()
  }

}
</script>

<style scoped>
#box {


}
#image {
  flex-basis: 40%;
  justify-content:last baseline;
}
#description {
  flex-basis: 50%;
  align-items: center;
  
}
img {
  max-width: 400px;
}

h3 {
  font-size: 28px;
}
</style>
