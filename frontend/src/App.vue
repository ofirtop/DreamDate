<template>
  <div id="app">
    <div class="flex items-center">
      <nav id="nav" class="flex items-center">
        <router-link to="/">
          <img src="@/assets/img/logo.png" alt="logo" class="logo">
        </router-link>
        <router-link to="/login">Login</router-link>
      </nav>
      <div v-if="loggedInUser">
        Hello
        {{loggedInUser.name}}
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  computed: {
    loggedInUser: function() {
      return this.$store.getters.loggedInUser;
    }
  }
};
</script>

<style lang="scss">
@import "@/sass/_variables.scss";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
#nav {
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: $color_primary;
    }
  }
}
.logo {
  width: 40px;
}
</style>
