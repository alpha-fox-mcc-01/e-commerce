<template>
  <main>
    <div class="container my-5">
      <div class="row">
        <div
          class="col-6 offset-3 offset-lg-0 col-lg-4 mb-2 mb-lg-0
          text-center text-lg-left align-self-center">
          <h1 class="welcome-heading">Welcome</h1>
          <div v-if="errors">
            <div class="alert alert-danger" role="alert" v-for="(error, i) in errors" :key="i">
              {{error}}
            </div>
          </div>
          <div class="alert alert-danger" role="alert" v-if='error'>
            {{error}}
          </div>
          <form @submit.prevent="registerUser">
            <div class="form-group">
              <label for="name">Name</label>
              <input type="text" class="form-control" id="name" placeholder="Harry"
                v-model="user.name" required>
            </div>
            <div class="form-group">
              <label for="email">Email address</label>
              <input type="email" class="form-control" id="email" placeholder="harry@potter.com"
                v-model="user.email" required>
              <small id="emailHelp" class="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" class="form-control" id="password" placeholder="********"
                v-model="user.password" required>
            </div>
            <button type="submit" class="btn btn-dark">Register</button>
          </form>
          <p class="mt-3">Already have an account?
            <span class="text-secondary pointer span-hover"
              @click="changePage('/login')"
            >
              Sign In here
            </span>
          </p>
        </div>
        <div class="col-lg-8 align-self-center d-none d-lg-block">
          <img class="landing-img" src="../assets/register.jpg" alt="multitasking-guy">
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'RegisterPage',
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: '',
      },
    };
  },
  computed: {
    error() {
      return this.$store.state.error;
    },
    errors() {
      return this.$store.state.errors;
    },
  },
  methods: {
    changePage(page) {
      this.$router.push(page);
    },
    registerUser() {
      this.$store.dispatch('register', {
        name: this.user.name,
        email: this.user.email,
        password: this.user.password,
      })
        .then((result) => {
          this.$store.commit('changeNotification', `Thanks ${result.data.name}, you are registered.`);
          this.user.name = '';
          this.user.email = '';
          this.user.password = '';
          this.$router.push('/login');
        })
        .catch((err) => {
          console.log(err.response);
          if (err.response.data.errors) {
            this.$store.commit('changeErrors', err.response.data.errors);
            setTimeout(() => {
              this.$store.commit('changeErrors', '');
            }, 5000);
          } else {
            this.$store.commit('changeError', err.response.data.msg);
            setTimeout(() => {
              this.$store.commit('changeError', '');
            }, 3000);
          }
        });
    },
  },
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem('access_token')) {
      next('/');
    } else {
      next();
    }
  },
};
</script>

<style scoped>
  .landing-img {
    max-width: 100%;
  }

  .pointer{
    cursor: pointer;
  }

  .span-hover {
    border-bottom: 1px solid white;
  }

  .span-hover:hover {
    color: rgb(85, 85, 85) !important;
    border-bottom: 1px solid black;
  }
</style>
