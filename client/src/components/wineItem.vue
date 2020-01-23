<template>
   <div class="card" style="width: 18rem;">
          <img class="card-img-top" src="../assets/wine_4.png" alt="Card image cap" />
          <div class="card-body">
              {{wine.name}}
            <p
              class="card-text"
            >{{wine.desc}} </p>
            <a href="#">{{wine.price}}</a>
          </div>
        </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
