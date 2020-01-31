<template>
  <tr>
    <td class="product-thumbnail mx-auto">
      <img
        :src="item.item.image"
        alt="Image"
        class="img-fluid"
        style="max-width: 300px; max-height: 350px"
      />
    </td>
    <td class="product-name">
      <h2 class="h5 cart-product-title text-black">{{item.item.name}}</h2>
    </td>
    <td>{{item.item.price}}</td>
    <td class="text-center">
      <strong>{{item.quantity}}</strong>
      <i
        class="fas fa-edit ml-4 text-success"
        style="cursor: pointer;"
        data-toggle="modal"
        data-target="#exampleModal"
      ></i>
    </td>
    <td>{{totalPrice}}</td>
    <td class="text-center">
      <p class="btn btn-danger height-auto btn-sm" @click="deleteItem(item._id)">
        <i class="fas fa-trash"></i>
      </p>
    </td>
  </tr>
</template>

<script>
import axios from "axios";
import Swal from 'sweetalert2'
export default {
  name: `ItemCart`,
  props: [`item`],
  data() {
    return {};
  },
  methods: {
    deleteItem(cartId) {
      axios({
        method: `DELETE`,
        url: `http://localhost:3000/users/delete/${cartId}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          console.log(data);
          this.$store.dispatch(`getCart`);
          Swal.fire("Deleted from cart!", "", "success");
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  },
  computed: {
    totalPrice() {
      const total = this.item.quantity * this.item.item.price;
      return total;
    }
  }
};
</script>

<style>
</style>