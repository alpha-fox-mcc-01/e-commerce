<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto my-auto">
        <div class="card card-signin my-5 shadow">
          <div class="card-body">
            <div class="register">
              <h3 class="card-title text-center" style="font-family: 'Patrick Hand SC', cursive;">
                <strong>Register</strong>
              </h3>
              <form class="form-signin">
                <div class="form-label-group my-4">
                  <input
                    type="text"
                    id="inputName"
                    class="form-control"
                    placeholder="Your name"
                    required
                    autofocus
                    v-model="name"
                  />
                </div>
                <div class="form-label-group my-4">
                  <input
                    type="email"
                    id="inputEmail"
                    class="form-control"
                    placeholder="Email address"
                    required
                    autofocus
                    v-model="email"
                  />
                </div>
                <div class="form-label-group my-4">
                  <input
                    type="password"
                    id="inputPassword"
                    class="form-control"
                    placeholder="Password"
                    required
                    v-model="password"
                  />
                </div>

                <button
                  type="button"
                  class="btn btn-danger btn-block"
                  style="font-family: 'Playfair Display SC', serif;"
                  @click="register"
                >Sign Up</button>
                <p class="text-center mt-5" style="cursor : pointer">
                  <router-link to="/login">Back to sign in</router-link>
                </p>
              </form>
            </div>
            <!-- sampai sini -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from 'sweetalert2'

export default {
  name: `Register`,
  data() {
    return {
      name: "",
      email: "",
      password: ""
    };
  },
  methods: {
    register() {
      axios({
        method: `POST`,
        url: "http://localhost:3000/users/register",
        data: {
          name: this.name,
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          console.log(data, `ini return data register`);
          this.$router.push("/login");
          Swal.fire("Registered successfully!", "", "success");
        })
        .catch(err => {
          console.log(err.message);
          this.name = ''
          this.email= ''
          this.password = ''
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        });
    }
  }
};
</script>

<style>
</style>