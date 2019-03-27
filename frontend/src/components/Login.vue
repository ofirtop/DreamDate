<template>
  <section class="login-demo-wrapper flex items-center content-center">
      <div class="welcome-msg">
      <h1>Welcome to DreamDate!</h1>
      </div>
    <div class="login-demo">
      <div class="flex space-between"  v-if="!isNewUser">
        <form @submit.prevent="$emit('login', userCredentials)">
          <input v-model="userCredentials.name" placeholder="Username" class="mr-1" autofocus>
          <input v-model="userCredentials.pass" placeholder="Password" class="mr-1">
          <button>Login</button>
        </form>
      </div>

      <div class="mt-1"  v-if="!isNewUser">
        Or choose a demo user:
        <button @click="loginDemoMale('male')" class="mr-1">Man</button>
        <button @click="loginDemoFemale('female')" class="mr-1">Woman</button>
      </div>
      <div v-if="isError" class="text-danger mt-1">Wrong username or password</div>
      <br>
      <br>
      <h3 class="mb-1"  v-if="!isNewUser">First time here? Register and meet your dream</h3>
      <button @click="isNewUser = true" v-if="!isNewUser">Register</button>
      <div class="signup mb-1 flex" v-if="isNewUser">
        <h4 class="mb-1">Choose your username and password</h4>
        <form @submit.prevent="signup">
          <input v-model="userCredentials.name" placeholder="Username" class="mr-1" autofocus>
          <input v-model="userCredentials.pass" placeholder="Password" class="mr-1">
          <button>Signup</button>
        </form>
      </div>
    </div>
    <div class="welcome-msg">
      <h2>Dream your love.. And love your dreams</h2>
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
      },
      isNewUser: false
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
    },
    signup(){
      this.$emit('signup', this.userCredentials);
      this.isNewUser = false;
    }
  }
};
</script>

<style scoped >
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
  height: 100vh;
  background: url("../assets/img/home-bg.jpg") no-repeat;

  background-size: cover;
  background-position: center;
  z-index: 3000;
  flex-direction: column;
  justify-content: space-around
}
.welcome-msg {
  z-index: 3001;
  justify-self: flex-start;
}
.welcome-msg>* {
  color:white;
  text-shadow: 0px 1px 15px rgba(36,19,19,0.67);
  font-size: 3em;
}
.signup {
  flex-direction: column;
  height: 100%;
}

</style>
