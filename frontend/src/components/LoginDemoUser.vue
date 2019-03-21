<template>
  <section class="login-demo-wrapper flex items-center content-center">
    <div class="login-demo">
      <h1>For Demo Only:</h1>
      <br>I am
      <button @click="setDemoUser('male')" class="mr-1">Man</button>
      <button @click="setDemoUser('female')">Woman</button>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    async setDemoUser(gender) {
      await this.$store.dispatch({ type: "setDemoUser", gender });
    }
  }
};
</script>

<style scoped  >
.login-demo {
  background-color: white;
  opacity: 0.8;
  width: 300px;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 0 7px 4px #00000052;
}
.login-demo-wrapper {
  position: fixed;
  width: 100vw;
  height: 90vh;
  background: url(/img/home-bg.afc254dd.jpg) no-repeat;
  background-size: cover;
  background-position: top right;
}
</style>
