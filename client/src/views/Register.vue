<template>
   <div class="container">
         <div class="row">
            <div class="col-sm-9 col-md-7 col-lg-5 mx-auto my-auto">
               <div class="card card-signin my-5">
                  <div class="card-body">
                     <div class="register">
                        <h3 class="card-title text-center" style="font-family: 'Patrick Hand SC', cursive;"><strong>Register</strong></h3>
                        <form class="form-signin">
                           <div class="form-label-group my-4">
                              <input type="text" id="inputName" class="form-control" placeholder="Your name" required
                                 autofocus>
                           </div>
                           <div class="form-label-group my-4">
                              <input type="email" id="inputEmail" class="form-control" placeholder="Email address"
                                 required autofocus>
                           </div>
                           <div class="form-label-group my-4">
                              <input type="password" id="inputPassword" class="form-control" placeholder="Password"
                                 required>
                           </div>

                           <button type="button" class="btn btn-danger btn-block"
                              style="font-family: 'Playfair Display SC', serif;">Sign Up</button>
                           <p class="text-center mt-5" style="cursor : pointer">
                              <router-link to="/login">Back to sign in</router-link></p>
                        </form>
                     </div>
                     <!-- sampai sini -->
                  </div>
               </div>
            </div>
         </div>
      </div>
</template>

<script>
export default {
   name : `Register`
}
</script>

<style>

</style>