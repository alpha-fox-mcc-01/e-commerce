<template>
  <modal name="login" :height="300" :width="600">
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
            <form method="post" v-on:submit.prevent="userLogin">
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
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    hide() {
      this.$modal.hide("login");
    },
    userLogin() {
      if (this.email === "") {
        this.$emit("got-error", "Email can't be blank");
      } else if (this.password === "") {
        this.$emit("got-error", "Password can't be blank");
      } else {
        this.$store
          .dispatch("login", { email: this.email, password: this.password })

          .then(success => {
            this.$store.commit("stateToken", success.data.access_token);
            this.$store.commit("setUserId", success.data.userId);
            this.hide();
          })
          .catch(err => {
            console.log(err);
            this.$emit("got-error", "Username or password incorrect.");
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
