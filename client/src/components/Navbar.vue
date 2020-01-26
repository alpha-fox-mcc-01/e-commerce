<template>
    <div class="flex mb-4 flex-wrap" style="box-shadow: 0 2px 2px -2px rgba(0,0,0,.2);">
      <router-link to="/">Home</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/register">Register</router-link>
      <div class="w-1/4 flex border-grey-light border">
      <input v-model="keyword" class="w-full rounded ml-1" type="text" placeholder="Search...">
      <button @click="searchItem" class="bg-grey-lightest border-grey border-l shadow hover:bg-grey-lightest">
        <span class="w-auto flex justify-end items-center text-grey p-2 hover:text-grey-darkest">
          <i class="material-icons text-xs">search</i>
        </span>
      </button>
      </div>
    </div>
</template>

<script>
export default {
  name: 'NavBar',
  data () {
    return {
      keyword: ''
    }
  },
  methods: {
    searchItem () {
      this.$store.dispatch('searchItem', this.keyword)
    }
  }
}
</script>

<style scoped>
div {
  text-align: center;
  box-shadow: 0 10px 10px -2px rgba(0,0,0,.2);
  margin-bottom: 1em;
  align-items: center;
  justify-content: space-evenly;
}
a {
  text-align: center;
  font-family: 'Open Sans', sans-serif;
  font-weight: 300;
  font-size: 18px;
}
a:hover {
  background-color: rgb(245, 227, 231);
}

li {
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
}
</style>
