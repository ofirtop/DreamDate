<template>
  <div id="app">
    <div class="flex items-center">
      <nav id="nav" class="flex items-center">
        <router-link to="/">
          <img src="@/assets/img/logo.png" alt="logo" class="logo">
        </router-link>
      </nav>
      <div class="clickable" v-if="loggedInUser" @click="toProfile">
        Hello
        {{loggedInUser.name}}
      </div>
    </div>
    <login-demo-user v-if="!loggedInUser"></login-demo-user>
    <new-member-like-me :member="newMemberWhoLikeMe" v-if="newMemberWhoLikeMe"/>
    <router-view/>
    <chat v-if="memberToChat" :member="memberToChat"/>
  </div>
</template>

<script>
import chat from "@/components/Chat.vue";
import loginDemoUser from "@/components/LoginDemoUser.vue";
import newMemberLikeMe from "@/components/NewMemberLikeMe.vue";
import { EVENT_BUS, EV_START_CHAT, EV_END_CHAT } from "@/event-bus.js";
import likeService from "@/services/like.service.js";

export default {
  data() {
    return {
      memberToChat: null,
      newMemberWhoLikeMe: null,
      membersWhoLikeMe: [],
    };
  },
  methods: {
    toProfile() {
      this.$router.push(`/user/${this.loggedInUser._id}`)
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    }
  },
  watch: {
    async loggedInUser() {
      if (this.loggedInUser) {
        this.membersWhoLikeMe = likeService.queryMembersWhoLikeMe(
          this.loggedInUser._id
        );
      }
    },
    membersWhoLikeMe() {
      this.newMemberWhoLikeMe = this.membersWhoLikeMe[
        this.membersWhoLikeMe.length - 1
      ];
      setTimeout(() => {
        this.newMemberWhoLikeMe = null;
      }, 5000);
    }
  },
  created() {
    EVENT_BUS.$on(EV_START_CHAT, member => {
      this.memberToChat = member;
    });
    EVENT_BUS.$on(EV_END_CHAT, () => {
      this.memberToChat = null;
    });
  },
  components: {
    chat,
    loginDemoUser,
    newMemberLikeMe
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
.clickable {
  cursor: pointer;
}
</style>
