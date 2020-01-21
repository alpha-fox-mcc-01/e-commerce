<template>
    <div>
     <div class="flex flex-wrap mb-4">
      <div class="w-1/3 h-12">
      </div>
      <div class="w-1/3 h-12">
        <ul class="navigation">
          <li>
            <a class="block mt-4 lg:inline-block lg:mt-0 text-black-200 hover:text-blue-500 mr-4">Shop All</a>
          </li>
          <li>
            <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-black-200 hover:text-blue-500 mr-4">Skincare</a>
          </li>
          <li>
            <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-black-200 hover:text-blue-500 mr-4">Makeup</a>
          </li>
          <li>
            <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-black-200 hover:text-blue-500 mr-4">Body
            </a>
          </li>
          <li>
          <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0 text-black-200 hover:text-blue-500 mr-4">Fragrance</a>
          </li>
        </ul>
        </div>
      <div class="w-1/3 h-12">
        <router-link to="/login">Login</router-link> |
        <router-link to="/register">Register</router-link>
      </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped>
.w-full {
  background-color: rgb(245, 227, 231); text-align: center;
}
a {
  text-align: center;
  font-family: sans-serif;
  font-weight: 500;
}
</style>
