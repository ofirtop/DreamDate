<template>
  <header class="app-header flex items-center">
    <nav id="nav" class="flex">
      <div class="logo-name">
      <router-link to="/">
        <img src="@/assets/img/logo_dd.png" alt="logo" class="logo">
      </router-link>
        <div class="main-header">DREAM DATE</div>
      </div>
      <div class="nav-links flex">
        <router-link :to="'/user/' + loggedInUser._id">My Profile</router-link>
        <div @click="$emit('logout')">Logout</div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "app-header",
  props: ["loggedInUser"]
};
</script>

<style lang="scss" scoped>
#nav {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: lightgray;
  align-items: center

}
nav {
  justify-content: space-between;
  font-family: "Playfair Display", serif;
}
.nav-links>* {
  margin: 10px;
}

.app-header{
    position: fixed;
    background-color: white;
    top: 0;
    z-index: 9;
    width: 100%;
    height: 3rem;
}
</style>