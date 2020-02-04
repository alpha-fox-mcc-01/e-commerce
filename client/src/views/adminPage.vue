<template>
 <div>
   <addProduct/>
   
   <allProduct/>
 </div>
</template>

<script>
import addProduct from '../components/addProduct'
import allProduct from '../components/allProduct'
export default {
name: 'adminPage',
components:{
  addProduct,
  allProduct
},
}
</script>

<style>

</style>