<template>
  <b-card :title="item.ProductId.name" style="margin: 1rem 0;">
    <b-card-text style="margin-bottom: 0px"
      >Quantity: {{ item.quantity }}</b-card-text
    >
    <b-card-text
      >Total: Rp
      {{ (item.quantity * item.ProductId.price).toLocaleString() }}</b-card-text
    >
    <b-button
      style="position: absolute; right: 1rem; top: 1rem;"
      @click="deleteItem(item.ProductId._id)"
      >🗑</b-button
    >
  </b-card>
</template>

<script>
export default {
  props: {
    item: Object
  },
  methods: {
    deleteItem(id) {
      this.$emit("remove-item", id);
      const stock = this.item.ProductId.stock + this.item.quantity;
      this.$store.dispatch("updateOneProductStock", { id, stock });
      this.$swal({
        icon: "success",
        title: "Item deleted.",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }
};
</script>

<style>
</style>
