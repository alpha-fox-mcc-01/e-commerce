<template>
  <tr>
    <td class="product-thumbnail mx-auto">
      <img :src="item.item.image" alt="Image" class="img-fluid" style="max-width: 300px;" />
    </td>
    <td class="product-name">
      <h2 class="h5 cart-product-title text-black">{{item.item.name}}</h2>
    </td>
    <td>{{item.item.price}}</td>
    <td class="text-center">
      <strong>{{item.quantity}}</strong>
      <i class="fas fa-edit ml-4 text-success" style="cursor: pointer;" data-toggle="modal" data-target="#exampleModal"></i>
    </td>
    <td>{{totalPrice}}</td>
    <td class="text-center">
      <p class="btn btn-danger height-auto btn-sm"><i class="fas fa-trash"></i></p>
    </td>
  </tr>
</template>

<script>
export default {
  name: `ItemCart`,
  props: [`item`],
  data() {
    return {};
  },
  methods: {},
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