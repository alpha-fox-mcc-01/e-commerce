<template>
  <div class="detail">
    <div>
      <Error v-if="error" :error="error" />
    </div>
    <b-card
      no-body
      class="overflow-hidden container"
      style="max-width: 1000px;"
    >
      <b-row no-gutters>
        <b-col md="6">
          <b-card-img class="rounded-0" :src="product.imageUrl"></b-card-img>
        </b-col>
        <b-col md="6">
          <b-card-body :title="product.name">
            <b-card-text style="margin-top: 3rem;">
              <table>
                <tr>
                  <th valign="top">Description</th>
                  <td>{{ product.description }}</td>
                </tr>
                <tr>
                  <th valign="top">Category</th>
                  <td>{{ product.category }}</td>
                </tr>
                <tr>
                  <th valign="top">Price</th>
                  <td>Rp {{ product.price.toLocaleString() }}</td>
                </tr>
                <tr v-if="access_token">
                  <th>Quantity</th>
                  <td>
                    <input type="number" name="qty" id="qty" v-model="qty" />
                  </td>
                </tr>
              </table>
            </b-card-text>
            <b-button
              v-if="access_token"
              style="position: absolute; bottom:1rem; right:1rem"
              @click.prevent="addToCart"
              variant="primary"
            >
              Add to Cart
            </b-button>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
    <!-- <button @click="hide">Close</button> -->
  </div>
</template>

<script>
import Error from "@/components/Error";
import { mapState } from "vuex";
export default {
  data() {
    return {
      product: {},
      qty: 1,
      error: ""
    };
  },
  methods: {
    fetchProduct() {
      this.$store
        .dispatch("fetchOneProduct", this.$route.params.id)
        .then(({ data }) => {
          this.product = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    addToCart() {
      if (this.product.stock >= this.qty) {
        this.$store
          .dispatch("addToCart", { id: this.$route.params.id, qty: this.qty })
          .then(() => {
            this.errorHandler("Added to cart.");
            this.qty = 1;
          });
        const stock = this.product.stock - this.qty;
        this.$store.dispatch("updateOneProductStock", {
          id: this.$route.params.id,
          stock
        });
      } else {
        this.errorHandler("Sorry, that's too much for us.");
      }
    },
    errorHandler(err) {
      this.error = err;
      setTimeout(() => {
        this.error = "";
      }, 2500);
    }
  },
  computed: mapState(["access_token"]),
  created() {
    this.fetchProduct();
  },
  watch: {
    "$route.params.id": function() {
      this.fetchProduct();
    }
  },
  components: {
    Error
  }
};
</script>

<style scoped>
.detail {
  width: 100%;
  /* margin: 0px; */
  /* padding: 0px; */
  border: none;
  border-radius: 0px;
  background-color: white;
  /* height: 70vh; */
}

.container {
  /* border: 1px dashed black; */
  padding: 10px;
  background: rgba(0, 0, 0, 0.1);
}

td,
th {
  text-align: left;
}

th {
  width: 8rem;
}
</style>
