/* eslint-disable no-tabs */
<template>
  <div class='row container'>
    <div class="card col-md-5" style='margin-right: 7rem; margin-left:3rem;'>
      <div class="card-body">
        <h5 class="card-title">Join Now</h5>
        <h6 class="card-subtitle mb-2 text-muted">Did you know?</h6>
        <!-- <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" class="card-link">Card link</a>
        <a href="#" class="card-link">Another link</a> -->
        <p class="card-text">When you create a WeCommerce account, you get access to cool stuff like:</p>
        <hr>
        <ul>
          <li>Automatic enrollment</li>
          <li>An easy, breezy checkout process</li>
          <li>Quick access to orders and tracking</li>
        </ul>
        <hr>
        <form @submit.prevent="goSignUp">
          <button type="submit" class="btn btn-primary">Sign Up</button>
        </form>
      </div>
    </div>
    <Signin>
    </Signin>
  </div>
</template>

<script>
import Signin from '../components/Signin'
export default {
  components: {
    Signin
  },
  methods: {
    goSignUp () {
      this.$router.push('/register')
    }
  }
}
</script>

<style scoped>
.container {
    position: absolute;
    top: 50%;
    left: 50%;
    -moz-transform: translateX(-50%) translateY(-50%);
    -webkit-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
}
</style>
