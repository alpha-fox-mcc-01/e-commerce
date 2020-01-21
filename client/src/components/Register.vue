<template>
  <modal name="register" :height="300" :width="600">
    <div class="modalBox">
      <!-- <div> -->
      <b-card no-body class="overflow-hidden">
        <b-row no-gutters style="background-color: grey">
          <b-col md="6" style="background-color: black">
            <b-card-img
              src="https://developer.android.com/images/landing/google-play-prereg.png"
              class="rounded-0"
            ></b-card-img>
          </b-col>
          <b-col md="6" style="display: flex; align-items: center; text-align: center;">
            <form>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="username"
                style="margin-bottom: 10px"
              />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="email"
                style="margin-bottom: 10px"
              />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                style="margin-bottom: 10px"
              />
              <input
                type="password"
                name="retype"
                id="retype"
                placeholder="retype your password"
                style="margin-bottom: 20px"
              />
              <p>
                <b-button
                  variant="primary"
                  type="submit"
                  style="border-radius: 40px; width: 250px;"
                >Submit</b-button>
              </p>
            </form>
          </b-col>
        </b-row>
      </b-card>
      <!-- </div> -->
      <!-- <button @click="hide">Close</button> -->
    </div>
  </modal>
</template>

<script>
export default {
  methods: {
    hide () {
      this.$modal.hide('register')
    }
  }
}
</script>
<style>
.modalBox {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 600px;
  height: 300px;
}

.modalBox div {
  width: 600px;
  height: 300px;
  border: none;
  border-radius: 0;
}

input {
  width: 250px;
  margin-bottom: 100px;
  border: none;
  border-radius: 10px;
  text-align: center;
}
</style>
