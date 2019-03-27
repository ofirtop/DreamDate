<template>
  <header v-if="loggedInUser" class="app-header flex items-center">
    <nav id="nav" class="flex">
      <div class="logo-name">
        <router-link to="/">
          <img src="@/assets/img/logo_dd.png" alt="logo" class="logo">
        </router-link>
        <div class="main-header">DREAM DATE</div>
      </div>
      <div class="nav-links flex items-center">
        <div class="user-img" v-if="loggedInUser">
          <img :src="loggedInUser.mainImage" alt="user image">
        </div>
        <div v-if="loggedInUser" >
          {{loggedInUser.name}}
        </div>       
        <div class="logout" @click="getMatch">Matches</div>
        <router-link class="my-profile" to="/"  >Gallery</router-link>
        <router-link class="my-profile" :to="'/user/' + loggedInUser._id"  v-if="loggedInUser">My Profile</router-link>
        <div class="logout" @click="$emit('logout')">Logout</div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "app-header",
  props: ["loggedInUser"],
  methods: {
    getMatch() {
      this.$router.push('/match')
    }
  }
};
</script>

<style lang="scss" scoped>
.logo-name {
  display: flex;
  // border: 1px solid black;
  align-items: center;
  margin-left: 10px;
}
.main-header {
  margin-left: 10px;
}
.logo {
  margin-top: 5px;
}
.logout {
  cursor: pointer;
  // border:1px solid black;
}
.my-profile {
  // border:1px solid black;
  font-family: "Playfair Display", serif;
  font-weight: 200;
}
#nav {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: lightgray;
  align-items: center;
}
nav {
  justify-content: space-between;
  font-family: "Playfair Display", serif;
}
.nav-links > * {
  margin: 10px;
}

.app-header {
  position: fixed;
  background-color: white;
  top: 0;
  z-index: 9;
  width: 100%;
  height: 3rem;
}
.user-img{
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  img{
    width:100%;
  }
}
</style>