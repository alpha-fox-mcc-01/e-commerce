/* eslint-disable indent */
<template>
    <div class="card container">
      <div class="card-body">
        <h5 class="card-title">Sign Up</h5>
        <h6 class="card-subtitle mb-2 text-muted">Start exploring a vast array of items to your needing</h6>
        <!-- <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" class="card-link">Card link</a>
        <a href="#" class="card-link">Another link</a> -->
        <form @submit.prevent="signUp">
          <div class="form-group">
              <label for="exampleInputPassword1">Username</label>
              <input type="username" v-model="username" class="form-control" id="exampleInputPassword1" placeholder="Password">
          </div>
          <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" v-model="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
              <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
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
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    signUp () {
      axios({
        method: 'POST',
        url: 'http://localhost:3000/users/signup',
        data: {
          username: this.username,
          email: this.email,
          password: this.password
        }
      })
        .then(() => {
          this.username = ''
          this.email = ''
          this.password = ''
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
.card.container {
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5rem;
}
</style>
