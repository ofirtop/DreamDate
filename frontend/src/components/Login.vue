<template>
  <section class="login-demo-wrapper flex items-center content-center">
    <div class="login-demo">
      <h1>For Demo Only:</h1>
      <br>I am
      <button @click="loginDemoMale('male')" class="mr-1">Man</button>
      <button @click="loginDemoFemale('female')" class="mr-1">Woman</button>

      <div class="flex space-between mt-1">
        <form>
          <input v-model="userCredentials.name" placeholder="Username" class="mr-1" autofocus>
          <input v-model="userCredentials.pass" placeholder="Password" class="mr-1">
          <button @click.prevent="doLogin">Login</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      userCredentials: {
        name: "",
        pass: ""
      }
    };
  },
  methods: {
    loginDemoFemale() {
      this.userCredentials.name = "Laura";
      this.userCredentials.pass = "123";
      this.$store.dispatch({
        type: "loginUser",
        userCredentials: this.userCredentials
      });
    },
    loginDemoMale() {
      this.userCredentials.name = "Ofir";
      this.userCredentials.pass = "123";
      this.$store.dispatch({
        type: "loginUser",
        userCredentials: this.userCredentials
      });
    },
    doLogin() {
      this.$store.dispatch({
        type: "loginUser",
        userCredentials: this.userCredentials
      });
    }
  }
};
</script>

<style scoped  >
.login-demo {
  background-color: white;
  opacity: 0.8;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 0 7px 4px #00000052;
}
.login-demo-wrapper {
  position: fixed;
  width: 100vw;
  height: 90vh;
  background: url("../assets/img/home-bg.jpg") no-repeat;

  background-size: cover;
  background-position: center;
  z-index: 3000;
}
</style>
