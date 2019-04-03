<template>
  <div id="app">
    <app-header :loggedInUser="loggedInUser" @logout="logout"/>
    <login v-if="!loggedInUser" :hasError="loginFailed" @login="login" @signup="signup" />
    <main class="App__main">
      <transition
        name="fade"
        mode="out-in"
      >
        <router-view @chat="openChat" @notLike="notLikeMember" @like="addLike"/>
      </transition>
    </main>
    <ul>
      <li v-for="notif in notifs" :key="notif._id">
        <notif
          :notif="notif"
          @chat="openChatFromNotif"
          @viewDetails="viewMemberDetailsFromNotif"
        />
      </li>
    </ul>
    <chat v-if="memberToChat" :member="memberToChat" @close="closeChat"/>
  </div>
</template>

<script>
import chat from "@/components/Chat.vue";
import login from "@/components/Login.vue";
import Notif from "@/components/Notif.vue";
import appHeader from "@/components/Header.vue";
import utilService from "@/services/util.service.js";

import {
  EVENT_BUS,
  EV_START_CHAT,
  EV_CHAT_RECEIVED_MSG,
  // EV_RECEIVED_LIKE
} from "@/event-bus.js";

export default {
  name: "App",
  data() {
    return {
      memberToChat: null,
      loginFailed: false,
      showLogin: false,
      notifAction: ''
    };
  },
  computed: {
    loggedInUser() {
      console.log("loggedInUser", this.$store.getters.loggedInUser);
      return this.$store.getters.loggedInUser;
    },
    newMembersWhoWatchedMeCount() {
      return this.$store.getters.newMembersWhoWatchedCount;
    },
    notifs(){
      return this.$store.getters.notifs;
    }
  },
  methods: {
    startChat(member) {
      EVENT_BUS.$emit(EV_START_CHAT, member);
    },
    openChatFromNotif(member) {
      this.memberForNotif = null;
      this.openChat(member);
    },
    viewMemberDetailsFromNotif(member) {
      this.$router.push("/member/" + member._id);
    },
    openChat(member) {
      this.memberToChat = member;
      this.$store.commit({ type: "startChat", member });
    },
    closeChat() {
      this.memberToChat = null;
    },
    async addLike(member) {
      await this.$store.dispatch({ type: "addLikeToMember", member });
      if (member.likes.iLike && member.likes.likeMe) {
        Swal.fire({
          title: "You have a new match !!!",
          type: "success",
          showCancelButton: true,
          confirmButtonText: "Send a message",
          cancelButtonText: "Later"
        }).then(result => {
          if (result.value) {
            EVENT_BUS.$emit(EV_START_CHAT, member);
          }
        });
      }
    },
    notLikeMember(memberId) {
      this.$store.dispatch({ type: "notLikeMember", memberId });
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
            await this.$store.dispatch({type: "loginUser", userCredentials});
            this.$router.push('/');
      } catch {
        this.loginFailed = true;
      }
    },
    async signup(userCredentials) {
      console.log('Signing up (HOME):', userCredentials);
        this.loginFailed = false;
      try {
        let user = await this.$store.dispatch({type: "signupUser", userCredentials});
        this.$router.push(`/user/${user._id}`)
      } catch {
        this.loginFailed = true;
      }
    },
    logout() {
      this.$store.dispatch({ type: "logoutUser" });
    }
  },
  async created() {
    //login
    let user = utilService.getFromStorage("loggedInUser");
    if (user) await this.login({ name: user.name, pass: "123" });
    else this.showLogin = true;

    EVENT_BUS.$on(EV_START_CHAT, member => {
      console.log(EV_START_CHAT, member);
      this.openChat(member);
    });
    // EVENT_BUS.$on(EV_RECEIVED_LIKE, member => {
    //   console.log(EV_RECEIVED_LIKE, member);
    //   this.openNotif("like", member);
    // });
    EVENT_BUS.$on(EV_CHAT_RECEIVED_MSG, msg => {
      let memberId = msg.from;
      console.log(EV_CHAT_RECEIVED_MSG, memberId);

      if (!this.$store.state.chat.member) {
        //console.log('chat is closed' );

        this.$store
          .dispatch({ type: "loadMemberById", memberId })
          .then(member => {
            this.openNotif("chat", member);
          });
      }
    });
  },
  components: {
    chat,
    login,
    Notif,
    appHeader
  }
};
</script>

<style lang="scss">
@import "@/sass/_variables.scss";

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: $bg-color;
}
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>
