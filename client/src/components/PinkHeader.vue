<template>
<div>
  <div id="top" class="flex mb-4">
   <div style="" class="w-full h-10"><a style="text-align: center;" class="headline">Spend $60 or more and get our limited-edition Balm Dotcom Scarf for free!</a></div>
  </div>
   <div style="box-shadow: 0 2px 2px -2px rgba(0,0,0,.2);" class="flex mb-4">
      <div class="w-1/3 h-12">
        <div class="hamburger"></div>
        <div class="hamburger"></div>
        <div class="hamburger"></div>  
      </div>
      <div class="w-1/3 h-12">
        <img id="logo" alt="fluffier logo" src="@/assets/imglogo.png">
      </div>
      <div id="side-ui" class="w-1/3 h-12">
        <ul id="icon-list">
          <li><img id="navbar-ui1" alt="profile" src="@/assets/ui_profileicon.png"></li>
          <li><img id="navbar-ui2" alt="cart" src="@/assets/UI-cart.png"></li>
        </ul>
      </div>
   </div>
</div>    
</template>

<script>
export default {
  name: 'PinkHeader'
}
</script>

<style scoped>
#top {
  background-color: rgb(245, 227, 231); text-align: center;
}
#icon-list {
    float: right;
    align-content: center;
    display: flex;
    margin-right: 30px;
    list-style: none;
    padding: 0px;
}

#logo {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 96px;
    height: 40px;
}
#navbar-ui1, #navbar-ui2 {
    margin-left: auto;
    margin-right: 20px;
    margin-top: 10px;
    width: 24px;
    height: 28px;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    /* padding: 0px 4px; */
}
</style>
