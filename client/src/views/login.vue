<template>
  <div class="container">
    <logo />
    <b-card header="LOGIN">
      <b-form @submit.prevent="onSubmit">
        <b-alert show variant="danger" v-if="alert">Username / Password is wrong</b-alert>
        <b-form-group
          id="input-group-1"
          label="Email address:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="email"
            type="email"
            required
            placeholder="mail@mail.com"
          ></b-form-input>
        </b-form-group>

          <b-form-group id="input-group-2" label="Password:" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="password"
              type="password"
              required
              placeholder="password"
            ></b-form-input>
          </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
        <div class="mt-2">
          <small>Don't have an account? <router-link to="/register">Register here</router-link></small>
        </div>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import logo from '../components/logo'
import axios from 'axios'
export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: '',
      alert: false
    }
  },
  components: {
    logo
  },
  methods: {
    onSubmit () {
      console.log(this.email)
      console.log(this.password)
      axios({
        method: 'get',
        url: 'http://localhost:3000/users'
      })
        .then(({ data }) => {
          console.log(data)
          data.forEach(user => {
            if (user.email === this.email && user.password === this.password) {
              localStorage.setItem('access_token', 'bismillah')
              setTimeout(() => {
                this.$router.push({ name: 'home' })
              }, 1000)
            } else {
              setTimeout(() => {
                this.alert = true
              }, 1000)
              setTimeout(() => {
                this.alert = false
              }, 3000)
            }
          })
        })
        .catch(err => {
          console.log(err.response)
        })
    }
  }
}
</script>

<style>

</style>
