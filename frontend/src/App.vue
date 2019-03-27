<template>
  <div id="app">
    <app-header :loggedInUser="loggedInUser" @logout="logout"/>
    <login v-if="!loggedInUser" :isError="loginFailed" @login="login"/>

    <router-view/>

    <incoming-msg-notification 
      :member="memberForNotification"
      :action="notificationAction"
      v-if="memberForNotification"
      @chat="openChatFromNotification"
      @viewDetails="viewMemberDetailsFromNotification"
    />
    <match v-if="memberForMatch" :member="memberForMatch" @close="memberForMatch = null"/>
    <chat v-if="memberToChat" :member="memberToChat" @close="closeChat"/>
  </div>
</template>

<script>
import chat from "@/components/Chat.vue";
import login from "@/components/Login.vue";
import incomingMsgNotification from "@/components/IncomingMsgNotification.vue";
import appHeader from "@/components/Header.vue";
import match from "@/components/Match.vue";
import utilService from "@/services/util.service.js";

import {
  EVENT_BUS,
  EV_START_CHAT,
  EV_NEW_MATCH,
  EV_CHAT_RECEIVED_MSG,
  EV_RECEIVED_LIKE
} from "@/event-bus.js";

export default {
  name: "App",
  data() {
    return {
      memberToChat: null,
      memberToChatNotifiation: null,
      memberForNotification: null,
      memberForMatch: null,
      loginFailed: false,
      showLogin: false,
      notificationAction: ''
    };
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    newMembersWhoWatchedMeCount() {
      return this.$store.getters.newMembersWhoWatchedCount;
    }
  },
  methods: {
    openNotification(action, member){
      this.memberForNotification = member;
            this.notificationAction = action;
            setTimeout(() => {
              this.memberForNotification = null;
            }, 5 * 1000);
    },
    startChat(member) {
      EVENT_BUS.$emit(EV_START_CHAT, member);
      this.memberToChatNotifiation = null;
    },
    closeChatNotification() {
      this.memberToChatNotifiation = null;
    },
    openChatFromNotification(member) {
      this.memberForNotification = null;
      this.openChat(member);
    },
    viewMemberDetailsFromNotification(member) {
      this.memberForNotification = null;
      this.$router.push("/member/" + member._id);
    },
    openChat(member) {
      this.memberToChat = member;
      this.$store.commit({ type: "startChat", member });
    },
    closeChat() {
      this.memberToChat = null;
    },
    gotoMembersWhoWatchedMe() {
      //update watchedMe list
      this.$store.dispatch({ type: "markWatchedMeMembersAsRead" });

      this.$router.push("/members/watched");
    },
    async login(userCredentials) {
      console.log("user cred", userCredentials);

      this.loginFailed = false;
      try {
        let loggedInUser = await this.$store.dispatch({type: "loginUser",userCredentials});
        utilService.saveToStorage("loggedInUser", loggedInUser);
      } catch {
        this.loginFailed = true;
      }
    },
    logout() {
      localStorage.removeItem('loggedInUser');
      this.$store.dispatch({ type: "logoutUser" });
    }
  },
  async created() {
    //login
    let user = utilService.getFromStorage("loggedInUser");
    if (user) await this.login({ name: user.name, pass: '123' });
    else this.showLogin = true;


    EVENT_BUS.$on(EV_START_CHAT, member => {
      console.log(EV_START_CHAT, member);
      this.openChat(member);
    });
    EVENT_BUS.$on(EV_NEW_MATCH, member => {
      this.memberForMatch = member;
    });
    EVENT_BUS.$on(EV_RECEIVED_LIKE, member => {
      console.log(EV_RECEIVED_LIKE, member);
      this.openNotification('like', member);
    });
    EVENT_BUS.$on(EV_CHAT_RECEIVED_MSG, msg => {
      let memberId = msg.from;
      console.log(EV_CHAT_RECEIVED_MSG, memberId);

      if (!this.$store.state.chat.member) {
        //console.log('chat is closed' );

        this.$store
          .dispatch({ type: "loadMemberById", memberId })
          .then(member => {
            this.openNotification('chat', member);
          });
      }
    });
  },
  components: {
    chat,
    login,
    incomingMsgNotification,
    match,
    appHeader
  }
};
</script>

<style lang="scss">
@import "@/sass/_variables.scss";

#app {
   //font-family: 'ABeeZee', sans-serif;
  // font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: $bg-color;
}
#nav {
  a {
    // font-weight: bold;
    color: black;
//     &.router-link-exact-active {
//       color: $color_primary;
  }
}

.logo {
  width: 40px;
}
.clickable {
  cursor: pointer;
}
</style>
