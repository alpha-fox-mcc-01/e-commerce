<template>
  <b-card style="margin: 10px 100px; font-weight: bold;">
    <div>
      <b-row>
        <b-col style="text-align: left;" cols="2">Product Name</b-col>
        <b-col style="text-align: left;">{{ product.name }}</b-col>
      </b-row>
      <b-row>
        <b-col style="text-align: left;" cols="2">Description</b-col>
        <b-col style="text-align: left;">{{ product.description }}</b-col>
      </b-row>
      <b-row>
        <b-col style="text-align: left;" cols="2">Price</b-col>
        <b-col style="text-align: left;">{{ product.price }}</b-col>
      </b-row>
      <b-row>
        <b-col style="text-align: left;" cols="2">Stock</b-col>
        <b-col style="text-align: left;">{{ product.stock }}</b-col>
      </b-row>
      <b-row style="justify-content: center">
        <b-button style="width: 100px; margin: 0 10px;" @click="edit"
          >Edit</b-button
        >
        <b-button style="width: 100px; margin: 0 10px;" @click="deleteProduct"
          >Delete</b-button
        >
      </b-row>
    </div>
    <EditProduct />
  </b-card>
</template>

<script>
export default {
  props: {
    product: Object
  },
  methods: {
    deleteProduct() {
      this.$store
        .dispatch("deleteProduct", this.product._id)
        .then(() => {
          console.log("deleted");
          this.$swal({
            icon: "success",
            title: "Item deleted.",
            showConfirmButton: false,
            timer: 1500
          });
          this.$router.go();
        })
        .catch(err => console.log(err));
    },
    edit() {
      this.$router.push("/edit/" + this.product._id);
    }
  }
};
</script>

<style>
</style>