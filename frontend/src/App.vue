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

    <login-demo-user v-if="!loggedInUser"/>

    <router-view/>

    <incoming-like-indicator :member="memberWhoLikeMe" v-if="memberWhoLikeMe"/>
    <incoming-chat-notification
      :member="memberToChatNotifiation"
      v-if="memberToChatNotifiation"
      @close="memberToChatNotifiation = null"
      @startChat="startChat($event)"
    />
    <match v-if="memberForMatch" :member="memberForMatch" @close="memberForMatch = null"/>
    <chat v-if="memberToChat" :member="memberToChat" @close="memberToChat = null"/>
  </div>
</template>

<script>
import chat from "@/components/Chat.vue";
import loginDemoUser from "@/components/LoginDemoUser.vue";
import incomingLikeIndicator from "@/components/IncomingLikeIndicator.vue";
import incomingChatNotification from "@/components/IncomingChatNotification.vue";
import match from "@/components/Match.vue";
import {
  EVENT_BUS,
  EV_START_CHAT,
  EV_NEW_MATCH,
  EV_CHAT_RECEIVED_MSG
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
  methods: {
    toProfile() {
      this.$router.push(`/user/${this.loggedInUser._id}`);
    },
    closeChatNotification(){
     this.memberToChatNotifiation = null; 
    }
    // ,
    // closeChat(){
    //   this.memberToChat = null;
    //   this.$store.commit({type:'endChat'});
    // }
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
    toProfile() {
      this.$router.push("/");
    },
    startChat(member){
      EVENT_BUS.$emit(EV_START_CHAT, member);
      this.memberToChatNotifiation = null;
    }
  },
  created() {
    EVENT_BUS.$on(EV_START_CHAT, member => {
      this.memberToChat = member;
      this.$store.commit({ type: "startChat", member });
    });
    EVENT_BUS.$on(EV_NEW_MATCH, member => {
      this.memberForMatch = member;
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
    loginDemoUser,
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
