<template>
  <div class="container mx-auto" style="width: 20rem; margin-top: 5rem">
    <h3>Sign In</h3>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          v-model="email"
        />
        <small
          id="emailHelp"
          class="form-text text-muted"
        >We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          v-model="password"
        />
      </div>
      <button type="submit" class="btn btn-primary">Sign In</button>
    </form>
    <p>
      <router-link to="register">Register here</router-link>
    </p>
    <div class="g-signin2 mt-3" data-onsuccess="onSignIn">GoogleSignIn</div>
  </div>
</template>
<script>
name: "loginPage";
import axios from "../api/axiosInstance";
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  props: {
    page: String
  },
  methods: {
    onSignIn(googleUser) {
      var profile = googleUser.getBasicProfile();
      // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
      // console.log('Name: ' + profile.getName());
      // console.log('Image URL: ' + profile.getImageUrl());
      // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
      // this.page = 'home'

      let username = profile.getName();

      axios({
        method: "post",
        url: `/user/googlesignin`,
        data: {
          google_token,
          username
        }
      })
        .then(({ data }) => {
          if (data.token) {
            localStorage.setItem("access_token", data.token);
            console.log(data);
            this.email = "";
            this.password = "";
            this.changePage("home");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    login() {
      axios({
        method: "post",
        url: "/user/login",
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          if (data.token) {
            localStorage.setItem("access_token", data.token);
            localStorage.setItem("name", data.name);
            console.log(data);
            this.email = "";
            this.password = "";
            this.$store.commit('checkLogin')
            this.$router.push('/')
            // this.changePage("home");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
     beforeRouteEnter (to, from, next) {
    // proses untuk dia udah login belom
    if (localStorage.getItem('access_token')) {
      next('/')
    } else {
      next()
    }
  },
   created: function(){
      this.$store.commit('checkLogin')
  }

};
</script>

<style>
</style>