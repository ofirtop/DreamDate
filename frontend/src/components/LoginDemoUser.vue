<template>
  <section class="login-demo-user">
    <div>
      <h1>For Demo Only:</h1>
      <br>
      <br>I am
      <button @click="setDemoUser('man')">Man</button>
      <button @click="setDemoUser('woman')">Woman</button>
    </div>
  </section>
</template>
<script>
export default {
  methods: {
    setDemoUser(gender) {
      let name = gender === "man" ? "David" : "Shula";
      this.$store
        .dispatch({ type: "setDemoUser", user: { gender, name, _id: 1 } })
        .then(() => {
          this.$emit("login");
        });
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
