<template>
  <div
    style="height: 90vh; display: flex; align-items: center; justify-content: center;"
  >
    <b-card border-variant="info" header="ADD PRODUCT" align="center">
      <form id="newEntry" method="post" @submit.prevent="addNewProduct">
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
          <b-form-file
            v-model="imageUrl"
            :state="Boolean(imageUrl)"
            placeholder="Browse image or drop it here"
            drop-placeholder="Drop file here..."
            style="margin-bottom: px; text-align:left"
          ></b-form-file>
        </div>
        <div>
          <b-button type="submit" style="margin-top:20px">ADD</b-button>
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
      imageUrl: []
    };
  },
  methods: {
    addNewProduct() {
      let formData = new FormData();
      formData.append("name", this.name);
      formData.append("description", this.description);
      formData.append("category", this.category);
      formData.append("price", this.price);
      formData.append("stock", this.stock);
      formData.append("imageUrl", this.imageUrl);

      axios
        .post("http://54.85.108.180:3000/api/product", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            access_token: localStorage.getItem("access_token")
          }
        })
        .then(success => {
          this.name = "";
          this.description = "";
          this.category = "";
          this.price = "";
          this.stock = "";
          this.imageUrl = [];
          console.log("added", success);
          this.$swal({
            icon: "success",
            title: "Added successfully.",
            showConfirmButton: false,
            timer: 1500
          });
          this.$router.push("/admin");
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style>
</style>