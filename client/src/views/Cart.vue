<template>
  <div class="container">
    <b-row>
      <b-col>
        <div v-for="(item, i) in cartList" :key="i">
          <CartItem :item="item" @remove-item="deleteItem" />
        </div>
      </b-col>
      <b-col cols="4">
        <CartSidebar :cartList="cartList" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import CartItem from '@/components/CartItem'
import CartSidebar from '@/components/CartSidebar'

export default {
  data () {
    return {
      cartList: []
    }
  },
  components: {
    CartItem,
    CartSidebar
  },
  methods: {
    getCartList() {
      this.$store.dispatch('fetchCart')
      .then(list => this.cartList = list.data)
      .catch(err => console.log(err))
    },
    deleteItem(id) {
      this.$store.dispatch('deleteFromCart', id)
      this.getCartList()
    }
  },
  created() {
    this.getCartList()
  }
}
</script>

<style>
</style>
