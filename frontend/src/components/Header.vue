<template>
  <header v-if="loggedInUser" class="app-header flex">
    <nav id="nav" class="nav-content-container flex align-end">
      <div class="logo-name flex align-end">
        <router-link to="/" class="logo-wrapper">
          <img src="@/assets/img/logo_hh.png" alt="logo" >
        </router-link>
        <div class="userName" v-if="loggedInUser">Welcome, {{loggedInUser.name}}</div>
      </div>
      <ul id="nav-links" :class="{open:isOpen}" class="nav-links flex align-end">
        <!-- <div class="user-img" v-if="loggedInUser">
          <img :src="loggedInUser.mainImage" alt="user image">
        </div>-->

        <li class="nav-link" @click="toProfile" v-if="loggedInUser" :class="{active: activeLink === 0}">My Profile</li>
        <li class="nav-link" @click="getMatch" :class="{active: activeLink === 1}">Matches</li>
        <li class="nav-link" @click="toMsgs" :class="{active: activeLink === 2}">Messages <span v-if="newMsgCount">({{newMsgCount}})</span></li>        
        <li class="nav-link" @click="toGallery" :class="{active: activeLink === 3}">Home</li>
        <li class="nav-link" @click="logout">Logout</li>
      </ul>
      <button class="toggle-menu-btn fa" @click="toggleMenu" alt="Open main menu"></button>
      <div :class="{open:isOpen}" class="toggle-menu-screen screen" @click="toggleMenu" alt="toggle main menu"></div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "app-header",
  props: ["loggedInUser"],
  data(){
    return {
      isOpen:false,
      activeLink: 3
    }
  },  
  computed:{
    msgs(){
      return this.$store.getters.msgs;
    },
    newMsgCount(){
      return this.$store.getters.unreadMsgCount;
    }
  },
  watch:{
    loggedInUser(){
      if(this.loggedInUser) this.$store.dispatch({type: 'getTopMsgs'});
    }
  },
  methods: {
    getMatch() {
      this.activeLink = 1;
      this.$router.push("/match");
    },
    toProfile() {
      this.activeLink = 0;
      this.$router.push(`/user/${this.loggedInUser._id}`);
    },
    toGallery() {
      this.activeLink = 3;
      this.$router.push(`/`);
    },
    toMsgs(){
      this.activeLink = 2;
      this.$router.push('/msg');
    },
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    logout(){
      this.activeLink = 3;
      this.$emit('logout');
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/sass/_fonts.scss";
@import '@/sass/_variables.scss';

.nav-link {
  cursor: pointer;
}
.nav-links > * {
  padding: 1rem 1rem 0.3rem 1rem;
  transition: 0.3s;
  border-bottom: 3px solid white;
 &.active{
    border-top-left-radius: 7px;   
    border-top-right-radius: 7px;   
    border-bottom: 3px solid $clr1;
 } 
}
.nav-links {
  height: 100%;
}

.logo-name {
  margin: 10px;
  flex-grow: 1;
  // border: 5px solid purple;
}
.logo-wrapper{
  display: inline-block;
    width: 80px;
    img{
      width: 100%;
      transform: translateY(6px);
    }
}
.userName {
  margin-left: 1rem;
}
.app-header {
  position: fixed;
  background-color: white;
  border-bottom: 1px solid #ccc;
  top: 0;
  z-index: 99;
  width: 100vw;
  height: 85px;
  // border: 5px solid black;
}
.user-img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
  }
}
.nav-content-container {
  max-width: 1200px;
  width: 100vw;
  margin: 0 auto;
  // border: 1px solid red;
  position: relative;
  font-size: 1.3rem;
}
.toggle-menu-btn {
  background: none;
  border: none;
  color: #fff;
  font-size: 1.75rem;
  margin-right: 20px;
  display: none;
  font-family: fontawesome;
  font-size: inherit;
}

@media (max-width: 740px) {
  .toggle-menu-btn {
    display: block;
  }
}


@media (max-width: 740px) {
  .nav-links {
    flex-direction: column;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 300;
    background-color: $clr2;
    color:white;
    height: 100vh;
    transition: transform 0.3s;
    transform: translate(100%, 0);
    opacity: .9;
  }
  .open.nav-links {
    transform: translate(0, 0);
  }
  .nav-links li {
    height: auto;
    line-height: .7;
    padding: 20px 0;
    width: 40vw;
    border: none;
    border-bottom: 1px solid #1e1e1e;
  }
  .nav-links li.active {
    border-width: 1px;
  }
}

.toggle-menu-screen {
  display: none;
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  background: rgba(42, 42, 42, 0.6);
  z-index: 100;
  opacity: 0;
  visibility: hidden;
  cursor: pointer;
  transition: opacity .5s;
}
@media (max-width: 740px) {
  .toggle-menu-screen {
    display: block;
  }
}
.open.toggle-menu-screen {
  visibility: visible;
  opacity: 1;
}
</style>