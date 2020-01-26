<template>
  <div id="MyCart">
    <div class="site-section pb-0">
      <div class="container">
        <div class="row mb-5">
          <form class="col-md-12" method="post">
            <div class="site-blocks-table">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th class="product-thumbnail">Image</th>
                    <th class="product-name">Product</th>
                    <th class="product-price">Price</th>
                    <th class="product-quantity">Quantity</th>
                    <th class="product-total">Total</th>
                    <th class="product-remove">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  <ItemCart v-for="item in itemCart" :key="item._id" :item="item" />
                </tbody>
              </table>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ItemCart from "../components/ItemCart";
export default {
  name: `MyCart`,
  data() {
    return {};
  },
  components : {
     ItemCart
  },
  methods: {},
  computed: {
    itemCart() {
      return this.$store.state.cart;
    }
  },
  created() {
    this.$store.dispatch("getCart");
  },
  beforeRouteEnter(to, from, next) {
    if (!localStorage.getItem(`token`)) {
      next("/login");
    } else {
      next();
    }
  }
};
</script>

<style>
</style>