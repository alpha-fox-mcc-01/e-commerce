<template>
  <div class="container">
    <logo />
    <b-card header="REGISTER">
      <b-form @submit.prevent="onSubmit">
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
          <small>Have an account? <router-link to="/login">Login here</router-link></small>
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
      name: ''
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
        url: 'http://localhost:3000/users',
        data: {
          name: this.name,
          email: this.email,
          password: this.password
        }
      })
        .then(({ data }) => {
          console.log(data)
          localStorage.setItem('access_token', 'bismillah')
          this.$bvModal.show('bv-modal-example')
          setTimeout(() => {
            this.$router.push({ name: 'home' })
          }, 5000)
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
