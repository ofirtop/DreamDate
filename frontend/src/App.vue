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
        <button @click="logout">Logout</button>
      </div>
    </div>

    <login v-if="!loggedInUser"/>

    <router-view/>

    <incoming-like-indicator
      :member="memberWhoLikeMe"
      v-if="memberWhoLikeMe"
      @chat="openChatFromLikeMeMemberNotification"
      @viewDetails="viewDetailsFromLikeMeMemberNotification"
    />
    <incoming-chat-notification
      :member="memberToChatNotifiation"
      v-if="memberToChatNotifiation"
      @close="memberToChatNotifiation = null"
      @startChat="startChat($event)"
    />
    <match v-if="memberForMatch" :member="memberForMatch" @close="memberForMatch = null"/>
    <chat v-if="memberToChat" :member="memberToChat" @close="closeChat"/>
  </div>
</template>

<script>
import chat from "@/components/Chat.vue";
import login from "@/components/Login.vue";
import incomingLikeIndicator from "@/components/IncomingLikeIndicator.vue";
import incomingChatNotification from "@/components/IncomingChatNotification.vue";
import match from "@/components/Match.vue";
import {
  EVENT_BUS,
  EV_START_CHAT,
  EV_NEW_MATCH,
  EV_CHAT_RECEIVED_MSG,
  EV_RECEIVED_LIKE
} from "@/event-bus.js";

export default {
  data() {
    return {
      memberToChat: null,
      memberToChatNotifiation: null,
      memberWhoLikeMe: null,
      memberForMatch: null
    };
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch({ type: "logoutUser" });
    },
    startChat(member) {
      EVENT_BUS.$emit(EV_START_CHAT, member);
      this.memberToChatNotifiation = null;
    },
    toProfile() {
      this.$router.push(`/user/${this.loggedInUser._id}`);
    },
    closeChatNotification() {
      this.memberToChatNotifiation = null;
    },
    openChatFromLikeMeMemberNotification(member) {
      this.memberWhoLikeMe = null;
      this.openChat(member);
    },
    viewDetailsFromLikeMeMemberNotification(member) {
      this.memberWhoLikeMe = null;
      this.$router.push("/member/" + member._id);
    },
    openChat(member) {
      this.memberToChat = member;
      this.$store.commit({ type: "startChat", member });
    },
    closeChat() {
      this.memberToChat = null;
    }
  },
  created() {
    EVENT_BUS.$on(EV_START_CHAT, member => {
      this.openChat(member);
    });
    EVENT_BUS.$on(EV_NEW_MATCH, member => {
      this.memberForMatch = member;
    });
    EVENT_BUS.$on(EV_RECEIVED_LIKE, member => {
      //console.log(EV_RECEIVED_LIKE, member);
      this.memberWhoLikeMe = member;
      setTimeout(() => {
        this.memberWhoLikeMe = null;
      },5000);
    });
    EVENT_BUS.$on(EV_CHAT_RECEIVED_MSG, msg => {
      let memberId = msg.from;
      //console.log(EV_CHAT_RECEIVED_MSG, memberId);

      if (!this.$store.state.chat.member) {
        //console.log('chat is closed' );

        this.$store
          .dispatch({ type: "loadMemberById", memberId })
          .then(member => {
            this.memberToChatNotifiation = member;
          });
      }
    });
  },
  components: {
    chat,
    login,
    incomingLikeIndicator,
    match,
    incomingChatNotification
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
