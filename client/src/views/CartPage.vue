<template>
<div class="flex mb-4">
  <div class="w-1/2">
  <h2>Cart</h2>
  <table class="table-auto">
  <thead>
    <tr>
      <th class="px-4 py-2">Item</th>
      <th class="px-4 py-2">Price</th>
      <th class="px-4 py-2">Quantity</th>
      <th class="px-4 py-2">Subtotal</th>
      <th class="px-4 py-2">Action</th>
     </tr>
  </thead>
  <tbody>
    <tr>
      <td class="px-4 py-2"><img id="productimage" src="https://media.glamour.com/photos/5bf6e17f4f736a2d2933191b/master/w_600,h_800,c_limit/Default-1.jpg" alt="productimage"></td>
      <td class="px-4 py-2">IDR400000</td>
      <td class="px-4 py-2">
        <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
        -
        </button>
        2
        <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r">
        +
        </button></td>
      <td class="px-4 py-2">IDR800000</td>
      <td class="px-4 py-2"><img id="trashicon" src="https://cdn1.iconfinder.com/data/icons/interface-line-3/64/Interface_Outline-39-512.png"></td>
    </tr>
  </tbody>
</table>
    </div>
    <div class="w-1/2">
      <table id="summary"  class="table-auto">
      <thead>
        <tr>
          <th class="px-4 py-2">Order Summary</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="px-4 py-2">Total Items:</td>
          <td class="px-4 py-2">2</td>
        </tr>
        <tr class="bg-gray-100">
          <td class="px-4 py-2">Total Cost:</td>
          <td class="px-4 py-2">IDR800000</td>
        </tr>
        <tr>
         <td class="px-4 py-2"></td>
         <button class="bg-black hover:bg-red-200 text-white font-bold py-2 px-4 rounded">
            Checkout
          </button>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script>
export default {
  name: 'CartPage'
}
</script>

<style scoped>
#productimage {
  max-width: 100px;
  max-height: 100px;
}
#trashicon {
  max-width: 20px;
  max-height: 20px;
}
.table-auto {
  border: none;
}

h2 {
  font-size: 20px;
}
</style>
