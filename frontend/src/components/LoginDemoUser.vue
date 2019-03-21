<template>
  <section class="login-demo-user">
    <div>
      <h1>For Demo Only:</h1>
      <br>
      <br>I am
      <button @click="setDemoUser('male')">Man</button>
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
.login-demo-user {
  background-color: white;
  opacity: 0.8;
  width: 300px;
}
button {
  margin-right: 10px;
}
</style>
