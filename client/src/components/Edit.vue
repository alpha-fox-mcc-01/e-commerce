<template>
  <div
    style="height: 90vh; display: flex; align-items: center; justify-content: center;"
  >
    <b-card
      border-variant="info"
      header="EDIT PRODUCT"
      align="center"
      style="width: 500px"
    >
      <form id="newEntry" method="post" @submit.prevent="editProduct">
        <div class="row">
          <b-input
            type="text"
            v-model="name"
            placeholder="Product Name"
            style="margin-top: 10px; margin-bottom: 10px;"
          />
        </div>
        <div class="row">
          <b-textarea
            v-model="description"
            placeholder="Product Name"
            style="margin-top: 10px; margin-bottom: 10px;"
          ></b-textarea>
        </div>
        <div class="row">
          <b-select name="cat" form="newEntry" v-model="category">
            <option value="Computer">Computer</option>
            <option value="Smartphone">Smartphone</option>
            <option value="Accessories">Accessories</option>
          </b-select>
        </div>
        <div class="row">
          <b-input
            type="number"
            v-model="price"
            placeholder="Product Price"
            style="margin-top: 10px; margin-bottom: 10px;"
          />
        </div>
        <div class="row">
          <b-input
            type="number"
            v-model="stock"
            placeholder="Product Stock"
            style="margin-top: 10px; margin-bottom: 10px;"
          />
        </div>
        <div>
          <b-button type="submit" style="margin-top:20px">EDIT</b-button>
        </div>
      </form>
    </b-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      description: "",
      category: "",
      price: "",
      stock: "",
      imageUrl: "",
      product: {}
    };
  },
  created() {
    this.getProduct();
  },
  methods: {
    editProduct() {
      this.$store
        .dispatch("editProduct", {
          id: this.product._id,
          name: this.name,
          description: this.description,
          category: this.category,
          price: this.price,
          stock: this.stock,
          imageUrl: this.imageUrl
        })
        .then(success => {
          this.name = "";
          this.description = "";
          this.category = "";
          this.price = "";
          this.stock = "";
          this.imageUrl = "";
          this.$router.push("/admin");
        })
        .catch(err => console.log(err));
    },

    getProduct() {
      this.$store
        .dispatch("fetchOneProduct", this.$route.params.id)
        .then(({ data }) => {
          this.product = data;
          this.name = data.name;
          this.description = data.description;
          this.category = data.category;
          this.price = data.price;
          this.stock = data.stock;
          this.imageUrl = data.imageUrl;
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style>
</style>