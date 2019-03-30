<template>
  <header v-if="loggedInUser" class="app-header flex items-center">
    <nav id="nav" class="flex">
      <div class="nav-content-container flex">
        <div class="logo-name">
          <router-link to="/">
            <img src="@/assets/img/logo_hh.png" alt="logo" class="logo">
          </router-link>
          <div
            class="userName"
            v-if="loggedInUser"
            style="margin-left:4rem;"
          >Welcome, {{loggedInUser.name}}</div>
        </div>
        <div class="nav-links flex items-center">
          <!-- <div class="user-img" v-if="loggedInUser">
          <img :src="loggedInUser.mainImage" alt="user image">
          </div>-->

          <div class="nav-link" @click="getMatch">Matches</div>
          <div class="nav-link" @click="toGallery">Gallery</div>
          <div class="nav-link" @click="toProfile" v-if="loggedInUser">My Profile</div>
          <div class="nav-link" @click="$emit('logout')">Logout</div>
        </div>
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
      this.$router.push("/match");
    },
    toProfile() {
      this.$router.push(`/user/${this.loggedInUser._id}`);
    },
    toGallery() {
      this.$router.push(`/`);
    }
  }
};
</script>

<style lang="scss" scoped>
.nav-link {
  cursor: pointer;
  font-weight: 200;
}
.logo-name {
  display: flex;
  // border: 1px solid black;
  align-items: center;
  margin: 10px;
}
.main-header {
  margin-left: 10px;
}
.logout {
  cursor: pointer;
}
// .my-profile {
//   // border:1px solid black;
//   font-weight: 200;
// }
#nav {
  // border:1px solid black;
  width: 100%;
  // position: relative;
  display: flex;
  // flex-direction: row;
  // justify-content: space-between;
  background-color: lightgray;
  justify-content: center;
  // align-items: center;
}
nav {
  // justify-content: space-between;
}
.nav-links > * {
  margin: 10px;
}
.nav-links {
  height: 100%;
}
.userName {
  font-weight: bold;
}
.app-header {
  position: fixed;
  background-color: white;
  top: 0;
  z-index: 9;
  width: 100%;
  height: 100px;
}
.user-img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
  }
  // @media (max-width: 700px){
  //   .userName {
  //     display: none;
  //   }
  // }
}
.nav-content-container{
  max-width: 1200px;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: lightgray;
  align-items: center;
   justify-content: space-between;
}
</style>