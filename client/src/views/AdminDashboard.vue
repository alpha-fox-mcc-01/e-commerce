<template>
  <div>
    <b-button
      style="position: absolute; right: 10px; top: 65px"
      @click="addProduct"
      >ADD</b-button
    >
    <Item v-for="product in products" :key="product._id" :product="product" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Item from "@/components/ItemAdmin";

export default {
  computed: mapState(["products"]),
  components: {
    Item
  },
  methods: {
    addProduct() {
      this.$router.push("/add");
    },
    editProduct() {
      this.$router.push("/edit");
    }
  },
  created() {
    this.$store.dispatch("fetchProducts");
  }
};
</script>

<style>
</style>