<template>
<div class="flex mb-4">
  <div class="w-1/2">
  <h2>Cart</h2>
  <table class="table-auto">
  <div v-if="!cart">
    <p>Your cart is empty</p>
  </div>
  <thead v-if="cart">
    <tr>
      <th class="px-4 py-2">Item</th>
      <th class="px-4 py-2">Price</th>
      <th class="px-4 py-2">Quantity</th>
      <th class="px-4 py-2">Subtotal</th>
      <th class="px-4 py-2">Action</th>
     </tr>
  </thead>
  <tbody>
    <tr v-for="item in cart" :key="item._id">
      <td class="px-4 py-2"><img id="productimage" :src="item.product.image" alt="productimage">{{item.product.name}}</td>
      <td class="px-4 py-2">IDR{{item.product.price}}</td>
      <td class="px-4 py-2">
        <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l" @click="minusQty(item.quantity, item.product.stock, item.product._id)">
        -
        </button>
        {{item.quantity}}
        <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r" @click="addQty(item.quantity, item.product.stock, item.product._id)">
        +
        </button></td>
      <td class="px-4 py-2">IDR {{(item.quantity * item.product.price)}}</td>
      <td class="px-4 py-2"><img id="trashicon" src="https://cdn1.iconfinder.com/data/icons/interface-line-3/64/Interface_Outline-39-512.png"></td>
    </tr>
  </tbody>
</table>
    </div>
    <div id="ordersummary" class="w-1/2">
      <table id="summary"  class="table-auto">
      <thead>
        <tr>
          <h2>Order Summary</h2>
        </tr>
      </thead>
       <br>
      <tbody>
        <tr>
          <td class="px-4 py-2">Total Items:</td>
          <td class="px-4 py-2">{{totalItem}}</td>
        </tr>
        <tr class="bg-gray-100">
          <td class="px-4 py-2">Total Cost:</td>
          <td class="px-4 py-2">IDR{{totalCost}}</td>
        </tr>
        <tr>
         <td class="px-4 py-2"></td>
         <button class="bg-black hover:bg-red-200 text-white font-bold py-2 px-4 rounded" @click="checkout">
          Checkout
          </button>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'CartPage',
  created: function () {
    this.$store.dispatch('fetchCart')
  },
  computed: {
    cart () {
      let sortedQty = this.$store.state.cart.filter(item => {
        return item.quantity > 0
      })
      return sortedQty
    },
    totalCost () {
      let totalPrice = 0
      this.cart.forEach(item => {
        if (item.quantity > 0) {
          totalPrice += (Number(item.product.price) * Number(item.quantity))
        }
      })
      return totalPrice
    },
    totalItem () {
      let totalQty = 0
      this.cart.forEach(item => {
        if (item.quantity > 0) {
          totalQty += Number(item.quantity)
        }
      })
      return totalQty
    }

  },
  methods: {
    addQty (qty, stock, productId) {
      if (stock >= (qty + 1)) {
        this.$store.dispatch('addToCart', productId)
        this.$store.dispatch('fetchCart')
      } else {
        Swal.fire('Oops..', 'Insufficient stock', 'error')
      }
      this.$store.dispatch('fetchCart')
    },
    minusQty (qty, stock, productId) {
      if (stock >= (qty - 1)) {
        this.$store.dispatch('reduceQty', productId)
        this.$store.dispatch('fetchCart')
        Swal.fire('Nice', 'Quantity -1', 'success')
      } else {
        Swal.fire('Oops..', 'Insufficient stock', 'error')
      }
      this.$store.dispatch('fetchCart')
    },
    checkout () {
      let payload = {
        newStock: 0,
        productId: ''
      }
      this.cart.forEach(item => {
        payload.newStock = item.product.stock - item.quantity
        payload.productId = item.product._id
        this.$store.dispatch('updateStock', payload)
      })
    }
  }
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
  margin-left: 3em;
}

h2 {
  font-size: 20px;
  font-weight: bold;
  color: black;
}

div {
  font-family: 'Open Sans', sans-serif;
}

#ordersummary {
  float: right;
}
</style>
