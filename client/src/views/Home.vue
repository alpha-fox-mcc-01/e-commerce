<template>
  <div class="home">
    <Error v-if="error" :error="error" />
    <HomeHeader :access_token="access_token" />
    <HomeFeatured :products="products" />
    <RegisterForm @error-message="errorHandler" :error="error" />
    <a href="" @click.prevent=""
      ><img
        v-if="!access_token"
        src="@/assets/registernow.png"
        style="width: 150px; position: absolute; top: 70px; right: 20px;"
        @click="show"
    /></a>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import HomeHeader from "@/components/Header.vue";
import HomeFeatured from "@/components/Featured.vue";
import RegisterForm from "@/components/Register.vue";
import Error from "@/components/Error.vue";
import axios from "axios";

export default {
  name: "home",
  data() {
    return {
      error: ""
    };
  },
  computed: {
    access_token() {
      return this.$store.state.access_token;
    },
    products() {
      return this.$store.state.products;
    }
  },
  components: {
    HomeHeader,
    HomeFeatured,
    RegisterForm,
    Error
  },
  methods: {
    show() {
      this.$modal.show("register");
    },
    hide() {
      this.$modal.hide("register");
    },
    errorHandler(err) {
      this.error = err;
      setTimeout(() => {
        this.error = "";
      }, 2500);
    }
  }
};
</script>
