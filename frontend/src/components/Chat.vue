<template>
  <section class="flex flex-column">
    <h1>
      Chat with {{member.name}}
      <button @click="$emit('close')">&times;</button>
      <span v-if="isMemberTyping">typing...</span>
    </h1>
    <ul class="flex flex-column">
      <li v-for="(msg, idx) in msgs" :key="idx" class="msg" :class="getClass(msg)">{{msg.txt}}</li>
    </ul>

    <div class="flex">
      <input autofocus @keyup.enter="sendMsg" v-model="currMsg.txt" @keydown="typeMsg">
      <button @click="sendMsg">Send</button>
    </div>
  </section>
</template>

<script>
import chatService from "@/services/chat.service.js";

export default {
  props: ["member"],
  data() {
    return {
      currMsg: chatService.getEmptyMsg(
        this.$store.state.loggedInUser._id,
        this.member._id
      ),
      iAmTyping: false
    };
  },
  computed: {
    msgs() {
      return this.$store.getters.chatMsgs;
    },
    isMemberTyping() {
      return this.$store.getters.isMemberTyping;
    }
  },
  watch: {
    currMsg: {
      handler: function(msg) {
        if (msg.txt === "" && this.iAmTyping) {
          this.$store.dispatch({ type: "finishTyping", msg: this.currMsg });
          this.iAmTyping = false;
        }
      },
      deep: true
    }
  },
  methods: {
    sendMsg() {
      this.$store.dispatch({ type: "sendChatMsg", msg: this.currMsg });
      this.currMsg = chatService.getEmptyMsg(
        this.$store.state.loggedInUser._id,
        this.member._id
      );
      this.iAmTyping = false;
    },
    getClass(msg) {
      let isOut = msg.fromId === this.$store.state.loggedInUser._id;
      return {
        in: !isOut,
        out: isOut
      };
    },
    typeMsg() {
      if (!this.iAmTyping) {
        this.$store.dispatch({ type: "startTyping", msg: this.currMsg });
        this.iAmTyping = true;
      }
    }
  }
};
</script>

<style scoped lang="scss">
section {
  position: fixed;
  bottom: 0;
  right: 0;
  height: 50vh;
  background: yellow;
  width: 40vw;
  max-width: 300px;
  border: 2px solid lightgoldenrodyellow;
  box-shadow: inset 0 0 9px 1px black;
  border-radius: 5px;
  padding: 5px;
}
ul {
  background-color: beige;
  flex-grow: 1;
  margin: 5px;
  padding: 5px;
  overflow-y: auto;
  text-align: left;
}
.msg {
  background-color: white;
  margin: 2px 0;
  max-width: 85%;
  &.in {
    background-color: chocolate;
    align-self: flex-start;
  }
  &.out {
    background-color: blueviolet;
    align-self: flex-end;
  }
}
</style>