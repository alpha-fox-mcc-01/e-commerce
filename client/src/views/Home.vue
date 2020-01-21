<template>
  <div class="home">
    <HomeHeader />
    <HomeFeatured />
    <RegisterForm />
    <img
      v-if="!access_token"
      src="@/assets/registernow.png"
      style="width: 150px; position: absolute; top: 70px; right: 20px;"
      @click="show"
    />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import HomeHeader from '@/components/Header.vue'
import HomeFeatured from '@/components/Featured.vue'
import RegisterForm from '@/components/Register.vue'

export default {
  name: 'home',
  components: {
    HomeHeader,
    HomeFeatured,
    RegisterForm
  },
  methods: {
    show () {
      this.$modal.show('register')
    },
    hide () {
      this.$modal.hide('register')
    }
  }
}
</script>
