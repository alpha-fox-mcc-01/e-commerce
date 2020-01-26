<template>
  <div class="detail">
    <b-card no-body class="overflow-hidden container" style="max-width: 1000px;">
      <b-row no-gutters>
        <b-col md="6">
          <b-card-img class="rounded-0" :src="product.imageUrl"></b-card-img>
        </b-col>
        <b-col md="6">
          <b-card-body :title="product.name">
            <b-card-text style="margin-top: 3rem;">
              <table>
                <tr>
                  <th>Description</th>
                  <td>{{product.description}}</td>
                </tr>
                <tr>
                  <th>Category</th>
                  <td>{{product.category}}</td>
                </tr>
                <tr>
                  <th>Price</th>
                  <td>{{product.price}}</td>
                </tr>
                <tr>
                  <th>Quantity</th>
                  <td>
                    <input type="number" name="qty" id="qty" v-model="qty" />
                  </td>
                </tr>
              </table>
            </b-card-text>
            <button
              style="position: absolute; bottom:1rem; right:1rem"
              @click.prevent="addToCart"
            >Add to Cart</button>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
    <!-- <button @click="hide">Close</button> -->
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      product: {},
      qty: 0
    }
  },
  methods: {
    fetchProduct () {
      this.$store.dispatch('fetchOneProduct', this.$route.params.id)
        .then(({ data }) => {
          this.product = data
        })
        .catch(err => {
          console.log(err)
        })
    },
    addToCart () {
      return this.$store.dispatch('addToCart', {id: this.$route.params.id, qty: this.qty})
    }
  },
  // computed: {
  //   UserId() {
  //     return this.$store.state.userId
  //   }
  // },
  created () {
    this.fetchProduct()
    console.log(this.$route.params.id)
  },
  watch: {
    '$route.params.id': function () {
      this.fetchProduct()
    }
  }
}
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
