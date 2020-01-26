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
          <small>Don't have an account? <a href="#" @click.prevent="toRegister">Register here</a></small>
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
      axios({
        method: 'post',
        url: 'http://localhost:3000/user/login',
        data: {
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          console.log(data.token)
          localStorage.setItem('access_token', data.token)
          setTimeout(() => {
            this.$router.push({ name: 'home' })
          }, 1000)
          //     setTimeout(() => {
          //       this.alert = true
          //     }, 1000)
          //     setTimeout(() => {
          //       this.alert = false
          //     }, 3000)
        })
        .catch(err => {
          console.log(err.response.data)
        })
    },
    toRegister () {
      let loader = this.$loading.show({ loader: 'dots' })
      setTimeout(() => {
        loader.hide()
        this.$router.push({ name: 'register' })
      }, 500)
    }
  }
}
</script>

<style>

</style>
