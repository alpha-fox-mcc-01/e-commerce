<template>
  <tr>
    <th scope="row" class="table-img"><img :src="product.product.image" alt="Product Image"></th>
    <td>{{ product.product.name }}</td>
    <td>Rp {{ price }}</td>
    <td>{{ product.quantity }}</td>
    <td>Rp {{ totalPrice }}</td>
    <td>
      <button class="btn btn-danger"
        @click="removeProduct(product.product._id)"
      >
        <i class="fas fa-trash"></i>
      </button>
    </td>
  </tr>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CartProduct',
  props: {
    product: Object,
  },
  computed: {
    price() {
      return new Intl.NumberFormat(['ban', 'id']).format(this.product.product.price);
    },
    totalPrice() {
      const total = Number(this.product.product.price * this.product.quantity);
      return new Intl.NumberFormat(['ban', 'id']).format(total);
    },
  },
  methods: {
    removeProduct(id) {
      console.log(id);
      axios({
        method: 'DELETE',
        url: `http://e-commerce.ivantjendra.xyz/user/${id}`,
        headers: {
          access_token: localStorage.getItem('access_token'),
        },
      })
        .then(() => {
          this.$store.dispatch('getUserCart');
        })
        .catch(() => {

        });
    },
  },
};
</script>

<style scoped>
img {
  max-height: 5rem;
}

</style>
