<template>
  <section class="login-demo-wrapper flex items-center content-center">
    <div class="login-demo">
      <div class="flex space-between">
        <form @submit.prevent="$emit('login', userCredentials)">
          <input v-model="userCredentials.name" placeholder="Username" class="mr-1" autofocus>
          <input v-model="userCredentials.pass" placeholder="Password" class="mr-1">
          <button>Login</button>
        </form>
      </div>

      <div class="mt-1">
        Or choose a demo user:
        <button @click="loginDemoMale('male')" class="mr-1">Man</button>
        <button @click="loginDemoFemale('female')" class="mr-1">Woman</button>
      </div>
      <div v-if="isError" class="text-danger mt-1">Wrong username or password</div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'login',
  props:['isError'],
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
      this.$emit('login', this.userCredentials);
    },
    loginDemoMale() {
      this.userCredentials.name = "Ofir";
      this.userCredentials.pass = "123";
      this.$emit('login', this.userCredentials);
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
