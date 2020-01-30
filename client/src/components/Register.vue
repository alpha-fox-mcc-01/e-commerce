<template>
  <modal name="register" :height="300" :width="600">
    <div class="modalBox">
      <!-- <div> -->
      <b-card no-body class="overflow-hidden">
        <b-row no-gutters style="background-color: grey">
          <b-col md="6" style="background-color: black">
            <b-card-img
              src="https://developer.android.com/images/landing/google-play-prereg.png"
              class="rounded-0 loginImage"
            ></b-card-img>
          </b-col>
          <b-col
            md="6"
            style="display: flex; align-items: center; text-align: center;"
          >
            <form method="post" v-on:submit.prevent="userRegister">
              <input
                type="text"
                name="username"
                id="username"
                placeholder="username"
                style="margin-bottom: 10px"
                v-model="username"
              />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="email"
                style="margin-bottom: 10px"
                v-model="email"
              />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                style="margin-bottom: 10px"
                v-model="password"
              />
              <input
                type="password"
                name="retype"
                id="retype"
                placeholder="retype your password"
                style="margin-bottom: 20px"
                v-model="retype"
              />
              <p>
                <b-button
                  variant="primary"
                  type="submit"
                  style="border-radius: 40px; width: 250px;"
                  >Submit</b-button
                >
              </p>
            </form>
          </b-col>
        </b-row>
      </b-card>
      <!-- </div> -->
      <!-- <button @click="hide">Close</button> -->
    </div>
  </modal>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      retype: ""
    };
  },
  methods: {
    hide() {
      this.$modal.hide("register");
    },
    userRegister() {
      if (this.username === "") {
        // this.$emit("error-message", "Username can't be blank");
        this.$swal({
          icon: "error",
          title: "Oops...",
          text: "Username can't be blank."
        });
      } else if (this.username.length < 10) {
        // this.$emit("error-message", "The minimum length of username is 10");
        this.$swal({
          icon: "error",
          title: "Oops...",
          text: "The minimum length of username is 10."
        });
      } else if (this.email === "") {
        // this.$emit("error-message", "Email can't be blank");
        this.$swal({
          icon: "error",
          title: "Oops...",
          text: "Email can't be blank."
        });
      } else if (this.password === "") {
        // this.$emit("error-message", "Password can't be blank");
        this.$swal({
          icon: "error",
          title: "Oops...",
          text: "Password can't be blank."
        });
      } else if (this.password.length < 10) {
        // this.$emit("error-message", "The minimum length of password is 10");
        this.$swal({
          icon: "error",
          title: "Oops...",
          text: "The minimum length of password is 10."
        });
      } else if (this.password !== this.retype) {
        // this.$emit("error-message", "Password and retype do not match");
        this.$swal({
          icon: "error",
          title: "Oops...",
          text: "Password and retype do not match."
        });
      } else {
        this.$store
          .dispatch("register", {
            username: this.username,
            email: this.email,
            password: this.password
          })
          .then(success => {
            // console.log("sukses register", success);
            this.hide();
          })
          .catch(err => {
            console.log(err);
            // this.$emit("error-message", "Username or email already taken.");
            this.$swal({
              icon: "error",
              title: "Oops...",
              text: "Username or email already taken."
            });
          });
      }
    }
  }
};
</script>
<style scoped>
.modalBox {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 600px;
  height: 300px;
}

.modalBox div {
  width: 600px;
  height: 300px;
  border: none;
  border-radius: 0;
}

.loginImage {
  width: 300px;
}

input {
  width: 250px;
  margin-bottom: 100px;
  border: none;
  border-radius: 10px;
  text-align: center;
}
</style>
