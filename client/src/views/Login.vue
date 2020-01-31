<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto my-auto">
        <div class="card card-signin my-5 shadow">
          <div class="card-body">
            <!-- bawah ini login -->
            <div class="login">
              <!-- <img class="login-icon mx-auto d-block mb-2" src="../assets/logologin.jpg" alt=""> -->
              <h3 class="text-center mb-4" style="font-family: 'Patrick Hand SC', cursive;">
                <strong>Login</strong>
              </h3>
              <form class="form-signin">
                <div class="form-label-group mb-4">
                  <input
                    type="email"
                    id="inputEmail"
                    class="form-control"
                    placeholder="Email address"
                    required
                    autofocus
                    v-model="email"
                  />
                  <!-- <label for="inputEmail">Email address</label> -->
                </div>

                <div class="form-label-group mb-4">
                  <input
                    type="password"
                    id="inputPassword"
                    class="form-control"
                    placeholder="Password"
                    required
                    v-model="password"
                  />
                  <!-- <label for="inputPassword">Password</label> -->
                </div>
                <button
                  type="button"
                  class="btn btn-danger px-5 btn-block"
                  style="font-family: 'Playfair Display SC', serif;"
                  @click="signIn"
                >Sign in</button>
                <hr class="my-4" />

                <p class="text-center mt-4" style="cursor: pointer;">
                  Don't have an account yet?
                  <router-link to="/register">Click here to Register</router-link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: `Login`,
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    signIn() {
      axios({
        method: `POST`,
        url: `http://localhost:3000/users/login`,
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          console.log(data);
          localStorage.setItem(`token`, data.token);
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onOpen: toast => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            }
          });

          Toast.fire({
            icon: "success",
            title: "Signed in successfully"
          });
          this.$store.dispatch("getCart");
          this.$store.dispatch('isLoginAction', true)
          this.$router.push("/");
        })
        .catch(err => {
          console.log(`eeeaaa gagal`);
          console.log(err.message);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Email / password wrong"
          });
        });
    }
  },
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem(`token`)) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        onOpen: toast => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        }
      });

      Toast.fire({
        icon: "info",
        title: "Already signed in"
      });
      next("/");
    } else {
      next();
    }
  }
};
</script>

<style>
</style>