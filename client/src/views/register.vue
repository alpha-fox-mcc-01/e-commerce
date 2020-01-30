<template>
  <div class="container">
    <logo />
    <b-card header="REGISTER">
      <b-form @submit.prevent="onSubmit">
        <b-alert show variant="danger" v-if="alert">{{ alert }}</b-alert>
        <b-form-group id="input-group-3" label="Name:" label-for="input-3">
            <b-form-input
              id="input-3"
              v-model="name"
              type="text"
              required
              placeholder="Your Name"
            ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-1"
          label="Email address:"
          label-for="input-1"
          description="We'll never share your email with anyone else."
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
          <small>Have an account? <a href="#" @click.prevent="toLogin">Login here</a></small>
        </div>
      </b-form>
    </b-card>
    <div>
      <b-modal id="bv-modal-example" hide-footer>
        <template v-slot:modal-title>
          Success
        </template>
        <div class="d-block text-center">
          <h5>Register success</h5>
        </div>
        <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">Close</b-button>
      </b-modal>
    </div>

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
      name: '',
      alert: ''
    }
  },
  components: {
    logo
  },
  methods: {
    onSubmit () {
      console.log(this.email)
      console.log(this.password)
      console.log(this.name)
      axios({
        method: 'post',
        url: 'http://localhost:3000/user/register',
        data: {
          name: this.name,
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          console.log(data.token)
          localStorage.setItem('access_token', data.token)
          this.$store.commit('setCurrentUserData', data)
          this.$store.commit('addIdUser', data._id)
          this.$bvModal.show('bv-modal-example')
          setTimeout(() => {
            this.$router.push({ name: 'home' })
          }, 5000)
        })
        .catch(err => {
          this.alert = err.response.data.errors[0]
          setTimeout(() => {
            this.alert = ''
          }, 3000)
          console.log(err.response)
        })
    },
    toLogin () {
      let loader = this.$loading.show({ loader: 'dots' })
      setTimeout(() => {
        loader.hide()
        this.$router.push({ name: 'login' })
      }, 500)
    }
  }
}
</script>

<style>

</style>
