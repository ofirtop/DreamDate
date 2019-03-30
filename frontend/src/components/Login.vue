<template>
  <section>
    <div class="wrapper flex content-center items-center">

      <div class="login-wrapper flex content-center">
        <div class="content">

          <h1 class="flex space-between items-center mb-5">
            {{isNewUser ? 'Sign up' : 'Login'}}  
            <button @click="flip" class="btn">
              {{isNewUser ? 'Login' : 'Sign up'}} 
            </button>
          </h1>
          <form @submit.prevent="submit" class="flex flex-column space-between align-start"  >
            <div class="flex space-between mb-5 demo-login" :class="{invisible: isNewUser}">
              <button @click="loginDemoMale('male')" class="btn btn-demo-man mr-2" type="button">Demo user <br /> Man</button>
              <button @click="loginDemoFemale('female')" class="btn btn-demo-woman" type="button">Demo user <br /> Woman</button>
            </div>
            <input v-model="userCredentials.name" placeholder="Username" autofocus  class="input">
            <br>
            <input v-model="userCredentials.pass" placeholder="Password" class="input" type="password">
            <br>
            <div>
              <button class="btn btn-login" type="submit">
                {{isNewUser? 'Sign up' : 'Login'}}
              </button>
            </div>
          </form>
          <div class="text-danger mt-1" :class="{invisible: !isShowErr}">Wrong username or password</div>
        </div>
      </div>
    </div>

    <!-- <h3 class="mb-1"  v-if="!isNewUser">First time here? Register and meet your dream</h3> -->
    <!-- <div class="welcome-msg">
      <h2>Dream your love and love your dream</h2>
    </div> -->

    <div class="screen"></div>
  </section>
</template>

<script>
export default {
  name: 'login',
  props:['hasError'],
  data() {
    return {
      userCredentials: {
        name: "",
        pass: ""
      },
      isNewUser: false,
      isShowErr: false
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
    submit(){
      let evName = this.isNewUser ? 'signup' : 'login';
      this.$emit(evName, this.userCredentials);
    },
    flip() {
      this.isNewUser = !this.isNewUser; 
      this.isShowErr = false;
      this.userCredentials = {
        name: "",
        pass: ""
      };
    }
  },
  watch:{
    hasError(){
      this.isShowErr = this.hasError;
    }
  }
};
</script>

<style scoped lang="scss">
@import '@/sass/_variables.scss';

.wrapper{
  width: 100vw;
  height: 100vh;
  // background-color: rgba(0, 0, 0, 0.75);
  background-image: url('../assets/img/home-bg.jpg');
  background-position: center;
  background-size:cover;
  
}
.screen{
  position: fixed;
  top:0;
  left:0;
  width: 100vw;
  height: 100vh;
  background-color: white;
  opacity:0.5;
  z-index: 98;
}
.login-wrapper {
  padding: 30px;
  z-index:99;
  background-color: gray;
  opacity:0.5;
}
.input{
  width: 100%;
}
.btn-login{
  color: $clr1;
}
.btn-demo-man{ color: $clr1; }
.btn-demo-woman{ color: $clr2; }

</style>
