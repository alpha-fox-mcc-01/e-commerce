<template>
  <main>
    <div class="container my-5">
      <div class="row">
        <div class="col-6 offset-3 offset-lg-0 col-lg-4 mb-2 mb-lg-0
          text-center text-lg-left align-self-center">
          <h1 class="welcome-heading">Welcome back</h1>
          <div class="alert alert-warning" role="alert" v-if='notification'>
            {{notification}}
          </div>
          <div class="alert alert-danger" role="alert" v-if='error'>
            {{error}}
          </div>
          <form @submit.prevent="loginUser">
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
            <button type="submit" class="btn btn-dark">Sign In</button>
          </form>
          <p class="mt-3">Don't have an account?
            <span class="text-secondary pointer span-hover"
            @click="changePage('/register')">Register here</span></p>
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
  name: 'LoginPage',
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
    };
  },
  computed: {
    notification() {
      return this.$store.state.notification;
    },
    error() {
      return this.$store.state.error;
    },
  },
  methods: {
    changePage(page) {
      this.$router.push(page);
    },
    loginUser() {
      this.$store.dispatch('login', {
        email: this.user.email,
        password: this.user.password,
      })
        .then((result) => {
          localStorage.setItem('access_token', result.data.access_token);
          localStorage.setItem('userName', result.data.name);
          this.user.email = '';
          this.user.password = '';
          this.$router.push('/');
          this.$store.dispatch('getUserCart');
          this.$store.commit('changeIsLogin', true);
        })
        .catch((err) => {
          console.log(err.response.data);
          if (err.response.data.msg) {
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
