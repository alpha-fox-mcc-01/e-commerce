/* eslint-disable indent */
<template>
    <div class="card col-md-5">
      <div class="card-body">
        <h5 class="card-title">Sign In</h5>
        <h6 class="card-subtitle mb-2 text-muted">Welcome Back!</h6>
        <!-- <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" class="card-link">Card link</a>
        <a href="#" class="card-link">Another link</a> -->
        <form @submit.prevent="signIn">
          <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" v-model="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
          </div>
          <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" v-model="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signIn () {
      axios({
        method: 'POST',
        url: 'http://localhost:3000/users/signin',
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          this.email = ''
          this.password = ''
          localStorage.setItem('access_token', data.access_token)
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
