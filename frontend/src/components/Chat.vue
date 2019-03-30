<template>
  <section class="chat-cmp flex flex-column">
    <h1 class="flex space-between">
      <div>
        Chat with {{member.name}}
      </div>
      <span class="typing" v-if="isMemberTyping">typing...</span>
      <div @click="closeChat">
        <font-awesome-icon icon="times" title="close" />
      </div>
    </h1>
    <ul class="flex flex-column">
      <li v-for="(msg, idx) in msgs" :key="idx" class="msg" :class="getClass(msg)">{{msg.txt}}</li>
    </ul>

    <div class="input-wrapper flex ">
      <input autofocus @keyup.enter="sendMsg" v-model="currMsg.txt" @keydown="typeMsg" placeholder="type your message...">
      <div @click="sendMsg" class="send">
        <font-awesome-icon icon="share" title="send"  />
      </div>
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
      let isOut = (msg.from === this.$store.state.loggedInUser._id);
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
    },
    closeChat() {
      this.$store.commit({ type: "endChat" });
      this.$emit("close");
    }
  }
};
</script>

<style scoped lang="scss">
@import '../sass/_variables.scss';

.chat-cmp {
  position: fixed;
  bottom: 0;
  right: 0;
  height: 50vh;
  background: white;
  width: 40vw;
  max-width: 300px;
  border: 2px solid white;
  box-shadow: inset 0 0 9px 1px black;
  border-radius: 5px;
  h1{
        padding: 15px 15px 5px 15px;
        .typing{
          color:#25ba25;
          font-size: 0.8em;
          align-self: flex-end;
        }
  }
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
  padding: 2px 5px;
  margin-top:2px;
  max-width: 85%;
  &.in {
    color: $clr2;
    align-self: flex-start;
  }
  &.out {
    color: $clr1;
    background-color: white;
    align-self: flex-end;
  }
}
.input-wrapper{
  padding: 5px 10px 10px 10px;
  input{
    flex-grow:1;
    border-radius: 25px;
    border: 1px solid gray;
    padding:5px;
    outline: none;
  }
}
.send{
  padding:5px;
  cursor: pointer;
}
</style>