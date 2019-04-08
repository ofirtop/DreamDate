<template>
  <header v-if="loggedInUser" class="app-header flex content-center">
    <nav id="nav" class="nav-content-container flex align-end">
      <div class="logo-name flex align-end">
        <router-link to="/" class="logo-wrapper">
          <img src="@/assets/img/logo_hh.png" alt="logo" >
        </router-link>
      </div>
      <ul id="nav-links" :class="{open:isOpen}" class="nav-links flex ">
        <!-- <div class="user-img" v-if="loggedInUser">
          <img :src="loggedInUser.mainImage" alt="user image">
        </div>-->

        <li @click="toGallery" :class="{active: activeLink === 3}">
          <div>Home</div>
        </li>
        <li @click="getMatch" :class="{active: activeLink === 1}">
          <div>Matches</div>
        </li>
        <li @click="toMsgs" :class="{active: activeLink === 2}">
          <div class="relative">
            Messages 
            <span v-if="newMsgCount" class="msg-count">
              <span>{{newMsgCount}}</span>
            </span>
            </div>
        </li>        
        <li @click="toggleSubMenu" class="flex relative user-menu">
          <div>{{loggedInUser.name}}</div>
          <div class="img-wrapper">
            <img :src="loggedInUser.mainImage">
          </div>
          <section class="sub-menu" :class="{show: activeLink === 0}">
            <ul class="flex flex-column space-around">
              <li @click.stop="toProfile">
                <div>My Profile</div>
              </li>              
              <li @click.stop="logout">
                <div>Logout</div>
              </li>
            </ul>
          </section>
        </li>
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
      this.isOpen = false;
      this.$router.push("/match");
    },
    toProfile() {
      this.activeLink = 4;
      this.isOpen = false;
      this.$router.push(`/user/${this.loggedInUser._id}`);
    },
    toGallery() {
      this.activeLink = 3;
      this.isOpen = false;
      this.$router.push(`/`);
    },
    toMsgs(){
      this.activeLink = 2;
      this.isOpen = false;
      this.$router.push('/msg');
    },
    toggleMenu() {
      this.isOpen = !this.isOpen;
    },
    logout(){
      this.isOpen = false;
      this.activeLink = 5;
      this.$emit('logout');
    },
    toggleSubMenu(){
      this.activeLink = (this.activeLink !== 0) ? 0 : -1;
      // this.activeLink = 0;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/sass/_variables.scss';

.app-header {
  position: fixed;
  background-color: white;
  border-bottom: 1px solid #ccc;
  top: 0;
  z-index: 99;
  width: 100%;
  height: 75px;
}
.nav-content-container {
  max-width: 1200px;
  width: 100%;
  position: relative;
  padding: 0 10px 1px 10px;
  font-weight: bold;
}
.nav-links {
  height: 100%;
}
.nav-links > * {
  padding: 1rem 1rem 0.3rem 1rem;
  transition: 0.3s;
  border-bottom: 3px solid white;
  cursor: pointer;
  &:last-child{
    padding-right:0;
  }
  & > div{
    display: flex;
    align-items:center;
    height: 100%;
  }
 &.active{
    border-bottom: 3px solid $clr1;
 } 
}
.logo-name {
  margin-bottom: 8px;
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
.user-img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
  }
}

.toggle-menu-btn {
  
  background: none;
  border: none;
  color: black;
  margin: auto 10px;
  font-size: 1em;
  width: 30px;
  font-size: 1.75rem;
  display: none;
  font-family: $fonts-awesome;
  font-size: inherit;
}
.img-wrapper{
  width: 50px;
  height: 50px;
  margin-left: 1rem;
  img{
    width: 50px;
    height: 50px;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
  }
}
.sub-menu{
  position: absolute;
  top: 4.7rem;
  right: 0px;
  overflow: hidden;
  z-index: 10000;  
  background-color: white;
  border-radius: 3px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26), 0 2px 10px 0 rgba(0, 0, 0, 0.16);
  padding: 10px 0px;
  transform-origin: right top;
  transform: scale(1);
  opacity: 1;
  font-weight: normal;
  display: none;
  li{
    padding: 5px 24px 5px 10px;
  }
  &.show{
    display: block;
  }
}
.msg-count{
    background-color: red;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    position: relative;
    top: -9px;
    right: 0px;
    padding: 1.5px;
    display: inline-block;
    line-height: 1.2; 
    color: white;   
    display: flex;
    align-items: center;
    justify-content: center;
}

@media (max-width: 740px) {
  .toggle-menu-btn {
    display: block;
    font-size: 1.5em;
  }
  .toggle-menu-screen {
    display: block;
  }
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
    padding: 20px 10px;
    width: 40vw;
    border: none;
    border-bottom: 1px solid #1e1e1e;
  }
  .nav-links li.active {
    border-width: 1px;
  }
  .sub-menu {
    background-color: unset;
    box-shadow: none
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
// @media (max-width: 740px) {
  .toggle-menu-screen {
    display: block;
  }
// }
.open.toggle-menu-screen {
  visibility: visible;
  opacity: 1;
}


</style>