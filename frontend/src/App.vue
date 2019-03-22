<template>
  <div id="app">
    <div class="flex items-center">
      
      <nav id="nav" class="flex items-center">
        <router-link to="/">
          <img src="@/assets/img/logo.png" alt="logo" class="logo">
        </router-link>
      </nav>

      <div v-if="loggedInUser">
        Hello
        {{loggedInUser.name}}
      </div>
    </div>
    
    <login-demo-user v-if="!loggedInUser" />

    <router-view/>

    <incoming-like-indicator :member="memberWhoLikeMe" v-if="memberWhoLikeMe"/>
    <match v-if="memberForMatch" :member="memberForMatch" @close="memberForMatch = null" />
    <chat v-if="memberToChat" :member="memberToChat" @close="memberToChat = null"/>

  </div>
</template>

<script>
import chat from "@/components/Chat.vue";
import loginDemoUser from "@/components/LoginDemoUser.vue";
import incomingLikeIndicator from "@/components/IncomingLikeIndicator.vue";
import match from "@/components/Match.vue";

import {EVENT_BUS, EV_START_CHAT, EV_NEW_MATCH} from "@/event-bus.js";

export default {
  data() {
    return {
      memberToChat: null,
      memberWhoLikeMe: null,
      memberForMatch: null
    };
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    }
  },
  created() {
    EVENT_BUS.$on(EV_START_CHAT, member => {
      this.memberToChat = member;
    });
    EVENT_BUS.$on(EV_NEW_MATCH, member => {
      this.memberForMatch = member;
    });
  },
  components: {
    chat,
    loginDemoUser,
    incomingLikeIndicator,
    match
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
