<template>
  <div id="app">
    <NavbarCustom/>
    <router-view/>
    <hr>
    <FooterCustom/>
  </div>
</template>

<script>
  import NavbarCustom from "./components/NavbarCustomer"
  import FooterCustom from "./components/FooterCustom"

  export default {
    name : `App`,
    components : {
      NavbarCustom,
      FooterCustom
    }
  }
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Fondamento|Gelasio|Patrick+Hand+SC|Playfair+Display+SC|Roboto&display=swap');
html {
   font-family: 'Roboto', sans-serif;
}
body {
   background-color: rgb(255, 244, 244)
}
header {
   justify-content: center;
   display: flex;
   height: 150px;
   align-items: center;
   text-align: center;
}
a {
   color: #917C78;
}
a:hover {
   text-decoration: none;
   scroll-behavior: smooth;
   color:  rgb(233, 32, 65);
}
.navbar {
   background-color: transparent;;
}

.navbar-toggler i {
   color: whitesmoke;
   font-size: 25px;
}

.navbar-nav {
   padding: 4;
}

.nav-link {
   color: rgb(94, 88, 86);
   text-transform: uppercase;
   font-family: 'Playfair Display SC', sans-serif;
}

.nav-link:hover {
   opacity: 0.5;    
   color: rgb(233, 32, 65); 
}
</style>
