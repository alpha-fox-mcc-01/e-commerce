<template>
  <div class="product">
    <ItemDetail />
    <div>
      <b-card no-body class="catNavigator" @click="show">
        <b-tabs pills card vertical style="display: flex; justify-content: flex-start">
          <b-tab title="Computer" active>
            <b-card-body>
              <!-- AKAN DIGANTI DENGAN DATA DARI DATABASE -->
              <b-row>
                <b-col-3>
                  <ProductItem />
                </b-col-3>
                <b-col-3>
                  <ProductItem />
                </b-col-3>
                <b-col-3>
                  <ProductItem />
                </b-col-3>
                <b-col-3>
                  <ProductItem />
                </b-col-3>
                <b-col-3>
                  <ProductItem />
                </b-col-3>
                <b-col-3>
                  <ProductItem />
                </b-col-3>
                <b-col-3>
                  <ProductItem />
                </b-col-3>
                <b-col-3>
                  <ProductItem />
                </b-col-3>
                <b-col-3>
                  <ProductItem />
                </b-col-3>
                <b-col-3>
                  <ProductItem />
                </b-col-3>
                <b-col-3>
                  <ProductItem />
                </b-col-3>
              </b-row>
              <!-- ---- -->
            </b-card-body>
          </b-tab>
          <b-tab title="Tab 2">
            <b-card-text>Tab contents 2</b-card-text>
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
import ProductItem from '@/components/ProductItem.vue'
import ItemDetail from '@/components/ItemDetail'
export default {
  components: {
    ProductItem,
    ItemDetail
  },
  methods: {
    show () {
      this.$modal.show('item-detail');
    },
    hide () {
      this.$modal.hide('item-detail');
    }
  }
}
</script>

<style>
.catNavigator {
  margin: 2%;
  background-color: rgba(255, 255, 255, 0.7);
  min-height: 60vh;
}
</style>
