<template>
  <div class="product">
    <router-view />
    <div>
      <b-card no-body class="catNavigator">
        <b-tabs pills card vertical style="display: flex; justify-content: flex-start">
          <b-tab title="Computer" active>
            <b-card-body>
              <b-row>
                <b-col v-for="(product, i) in filteredProduct('computer')" :key="i">
                  <ProductItem :product="product" :title="product.name" />
                </b-col>
              </b-row>
            </b-card-body>
          </b-tab>
          <b-tab title="Smartphone">
            <b-card-body>
              <b-row>
                <b-col
                  v-for="(product, i) in products"
                  :key="i"
                  v-if="product.category === 'smartphone'"
                >
                  <ProductItem :product="product" :title="product.name" />
                </b-col>
              </b-row>
            </b-card-body>
          </b-tab>
          <b-tab title="Tab 3">
            <b-card-text>Tab contents 3</b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
import ProductItem from '@/components/ProductItem'

export default {
  components: {
    ProductItem
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  created() {
    this.$store.dispatch('fetchProducts')
  },
  methods: {
    filteredProduct(category) {
      return products.filter(product => product.category === 'category')
    }
  }
}
</script>

<style scoped>
body {
  background-color: white;
}
.catNavigator {
  background-color: rgba(255, 255, 255, 1);
  min-height: 100vh;
  border-radius: 0;
}
</style>
