<template>
  <div id="app">
    <nav id="nav" class="flex items-center">
      <router-link to="/">
        <img src="@/assets/img/logo.png" alt="logo" class="logo">
      </router-link>
      <router-link to="/about">About</router-link>
    </nav>
    <router-view/>
  </div>
</template>

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
