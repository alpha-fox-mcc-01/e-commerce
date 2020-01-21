<template>
  <div class="container">
         <div class="row">
            <div class="col-sm-9 col-md-7 col-lg-5 mx-auto my-auto">
               <div class="card card-signin my-5">
                  <div class="card-body">
                     <!-- bawah ini login -->
                     <div class="login">
                        <!-- <img class="login-icon mx-auto d-block mb-2" src="../assets/logologin.jpg" alt=""> -->
                        <h3 class="text-center mb-4" style="font-family: 'Patrick Hand SC', cursive;">
                           <strong>Login</strong></h3>
                        <form class="form-signin">
                           <div class="form-label-group mb-4">
                              <input type="email" id="inputEmail" class="form-control" placeholder="Email address"
                                 required autofocus>
                              <!-- <label for="inputEmail">Email address</label> -->
                           </div>

                           <div class="form-label-group mb-4">
                              <input type="password" id="inputPassword" class="form-control" placeholder="Password"
                                 required>
                              <!-- <label for="inputPassword">Password</label> -->
                           </div>
                           <button type="button" class="btn btn-danger px-5 btn-block"
                              style="font-family: 'Playfair Display SC', serif;">Sign in</button>
                           <hr class="my-4">

                           <p class="text-center mt-4" style="cursor: pointer;">
                              Don't have an account yet? <router-link to="/register">Click here to Register</router-link></p>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
</template>

<script>
export default {
   name: `Login`
}
</script>

<style>

</style>